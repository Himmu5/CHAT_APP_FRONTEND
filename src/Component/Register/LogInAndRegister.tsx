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
    return  <Navigate to={"/Chat"} />
  }

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50 mb-10">
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
      bag.props.setUser(res);
    });
  }
  if (bag.props.formType == "Log In") {
    logInUser(values).then((res) => {
      console.log( "User created" , res);
      const temp = { ...res , userId : res._id}
      bag.props.setUser(temp);
    });

  }
};

const HOC = withFormik({
  mapPropsToValues: () => initialState,
  handleSubmit: submit,
});

export default withUser(HOC(LogInAndRegister));
