import { FC } from "react";
import Input from "./Input";
import Button from "./Button";
import { FormikBag, FormikProps, withFormik } from "formik";
import { createUser, logInUser } from "../Apis/Auth";
import { withUser } from "../hoc/withUser";
import { user } from "../models/user";
import { Link, Navigate } from "react-router-dom";

type P = {
  user: user;
  setUser: (U: user) => void;
  formType: "Log In" | "Register Now";
} & FormikProps<S>;

const LogInAndRegister: FC<P> = ({
  formType,
  user,
  values,
  handleChange,
  handleSubmit,
}) => {

  if (user) {
    return <Navigate to={"/Chat"} />
  }

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50 mb-10">
      <div>
        <div className=" mb-10 justify-center flex items-center gap-2">
          <img className="h-10 w-10" src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="logo" />
          <p className="text-sm sm:text-lg md:text-xl">Chat AI</p>
        </div>
        <form className=" space-y-2  w-64 flex flex-col " onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Enter the email"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button type="submit">{formType}</Button>
          {formType == "Log In" ? (
            <Link to="/" className="text-center text-sm underline">
              Create a Account
            </Link>
          ) : (
            <Link to={"/LogIn"} className="text-center text-sm underline">
              Already have an account?
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

const initialState = {
  username: "",
  password: "",
};

type S = typeof initialState;

const submit = (values: S, bag: FormikBag<P, S>) => {
  if (bag.props.formType == "Register Now") {
    createUser(values).then((res) => {
      localStorage.setItem("token", res.token);
      bag.props.setUser(res.user);
    });
  }
  if (bag.props.formType == "Log In") {
    logInUser(values).then((res) => {
      localStorage.setItem("token", res.token);
      bag.props.setUser(res.user);
    });

  }
};

const HOC = withFormik({
  mapPropsToValues: () => initialState,
  handleSubmit: submit,
});

export default withUser(HOC(LogInAndRegister));
