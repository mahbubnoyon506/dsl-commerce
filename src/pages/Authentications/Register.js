import RegisterArea from "../../components/Auth/RegisterArea";
import PageTitle from "../../components/Common/PageTitle";
import Support from "../../components/Common/Support";

function Register() {
  return (
    <div className="register-wrapper">
      <PageTitle title="Register" />
      <section className="register-area ptb-50">
        <div className="container">
          <RegisterArea />
        </div>
      </section>
      <Support />
    </div>
  );
}

export default Register;
