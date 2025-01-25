import { EditFormData, FormData } from "../types";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

//Edit Cabin
export async function editCabin(newCabin: EditFormData) {
  if (typeof newCabin.image === "string") {
    const { data, error } = await supabase
      .from("cabins")
      .update(newCabin)
      .eq("id", newCabin.id)
      .select();
    if (error) {
      throw new Error("cannot update the cabin");
    }

    return data;
  }

  const file = newCabin.image.item(0);

  if (!file) {
    throw new Error("Cannot find the image");
  }

  const imageName = `${Math.random()}- ${file.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", newCabin.id)
    .select();

  if (error) {
    throw new Error("Cannot Update the cabin");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, file);

  if (storageError) {
    throw new Error("Image could not be added");
  }

  return data;
}

// Create Cabin
export async function createCabin(newCabin: FormData) {
  const file = newCabin.image.item(0);

  if (!file) {
    throw new Error("Image not found");
  }

  const imageName = `${Math.random()}-${file.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error("Cabin could not be added");
  }
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, file);

  if (storageError) {
    throw new Error("Image could not be added");
  }

  return data;
}

export async function deletecabin(id: number | undefined) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
