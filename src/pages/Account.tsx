import UpdatePasswordForm from "@/components/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white text-gray-800">
        Update your account
      </h1>

      <div className="dark:bg-zinc-900 bg-white rounded-lg p-5">
        <h3 className="text-xl font-bold mb-4">Update User Data</h3>
        <UpdateUserDataForm />
      </div>

      <div className="dark:bg-zinc-900 bg-white rounded-lg p-5">
        <h3 className="text-xl font-bold mb-4">Update password</h3>
        <UpdatePasswordForm />
      </div>
    </div>
  );
}

export default Account;
