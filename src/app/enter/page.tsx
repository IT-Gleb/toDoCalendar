import RegisterUserComponent from "@/components/authComponents/registerUserComponent";

//bg-[url('../../assets/images/svg/bg-space_production.svg')]
export default async function LoginPage() {
  return (
    <section className="min-h-screen bg-no-repeat bg-fixed bg-cover bg-[url('../../assets/images/gif/matrix.gif')] bg-center">
      <RegisterUserComponent />
    </section>
  );
}
