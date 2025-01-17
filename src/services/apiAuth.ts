import supabase from "./supabase";

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

interface UpdateUserParams {
  fullName?: string;
  avatar?: File;
  password?: string;
}

interface UserUpdateData {
  password?: string;
  data?: {
    fullName?: string;
    avatar?: string;
  };
}

export async function updateCurrentUser({
  fullName,
  avatar,
  password,
}: UpdateUserParams) {
  try {
    // Step 1: Update user basic info

    const userData = createUpdateUserData({ fullName, password });
    const { data: updatedUser, error: updateError } =
      await supabase.auth.updateUser(userData);

    if (updateError) throw new Error(updateError.message);

    // Step 2: Handle avatar upload if provided
    if (!avatar) return updatedUser;

    const avatarUrl = await uploadUserAvatar(avatar, updatedUser.user.id);

    // Step 3: Update user with avatar URL
    const { data: userWithAvatar, error: avatarUpdateError } =
      await updateUserAvatar(avatarUrl);

    if (avatarUpdateError) throw new Error(avatarUpdateError.message);

    return userWithAvatar;
  } catch (error) {
    throw new Error(
      `Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

function createUpdateUserData({
  fullName,
  password,
}: Omit<UpdateUserParams, "avatar">): UserUpdateData {
  if (password) return { password };
  if (fullName) return { data: { fullName } };
  return {};
}

async function uploadUserAvatar(avatar: File, userId: string): Promise<string> {
  const fileName = `avatar-${userId}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError)
    throw new Error(`Failed to upload avatar: ${uploadError.message}`);

  return `https://uyhplgxrprcaftmdiius.supabase.co/storage/v1/object/public/avatars/${fileName}`;
}

async function updateUserAvatar(avatarUrl: string) {
  return await supabase.auth.updateUser({
    data: { avatar: avatarUrl },
  });
}
