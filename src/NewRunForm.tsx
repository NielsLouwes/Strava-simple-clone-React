import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { FormLabel, FormButton } from "./App.styled";
import { GearList, Run } from "./App";
import { AppUtils } from "./App.utils";
import styled from "styled-components";
import { useGearManagement } from "./hooks/useGearManagement";

interface Values {
  title: string;
  distance: number;
  pickedGear: string;
}

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin: 10px;
`;

type NewRunFormProps = {
  setRunCollection: React.Dispatch<React.SetStateAction<[] | Run[]>>;
  runCollection: Run[];
  gearListState: any;
  setGearListState: any;
};

export const NewRunForm = ({
  setRunCollection,
  runCollection,
  gearListState,
  setGearListState,
}: NewRunFormProps) => {
  // const { gearListState, setGearListState } = useGearManagement();

  const validateDistance = (value: any) => {
    let error;
    const reg = /^[0-9]+$/;

    if (!value) {
      error = "Required!";
    } else if (!reg.test(value)) {
      error = "Only numbers are allowed";
    } else if (parseInt(value, 10) > 400) {
      error = "Too great a distance, try again.";
    }
    return error;
  };

  const validateTitle = (value: any) => {
    let error;
    const reg = /^[a-zA-Z]+$/;

    if (!value) {
      error = "Required!";
    } else if (reg.test(value)) {
      error = "Only letters are allowed";
    } else if (value > 100) {
      error = "Max number of characters reached.";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        title: "",
        distance: 0,
        pickedGear: "Asics Trebuco Max",
      }}
      onSubmit={(values: Values, formikHelpers: FormikHelpers<Values>) => {
        const { setSubmitting, resetForm } = formikHelpers;
        setTimeout(() => {
          setRunCollection([...runCollection, values]);
          AppUtils.updateGearKilometers(
            values,
            gearListState,
            setGearListState
          );
          setSubmitting(false);
          resetForm({
            values: { title: "", distance: 0, pickedGear: "Asics Trebuco Max" },
          });
        }, 500);
      }}
    >
      <Form>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Field
          id="title"
          name="title"
          placeholder="describe your run"
          validate={validateTitle}
        />

        <FormLabel htmlFor="distance">Distance</FormLabel>
        <Field
          id="distance"
          name="distance"
          placeholder="in km"
          validate={validateDistance}
        />
        <ErrorMessage name="distance" component={ErrorText} />
        <ErrorMessage name="title" component={ErrorText} />

        <FormLabel htmlFor="gear">Gear used</FormLabel>
        <Field as="select" name="pickedGear">
          {gearListState.map((item: GearList) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </Field>
        <FormButton type="submit">Submit</FormButton>
      </Form>
    </Formik>
  );
};
