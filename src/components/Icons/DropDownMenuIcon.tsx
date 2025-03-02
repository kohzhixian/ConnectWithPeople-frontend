import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import {
  setErrorMessage,
  setShowErrorSnackbar,
  setShowSuccessSnackbar,
  setSuccessMessage,
} from "../../redux/reducers/misc.reducer";
import { addContactSchema } from "../../schemas/addContactSchema";
import { useAddContactMutation } from "../../services/contact.api";
import { AddContactInputs } from "../../types/reducer/contact.type";
import { ErrorMessageInterface } from "../../types/reducer/misc.type";
import { CustomButton } from "../CustomButton";
import { InputField } from "../LoginPage/InputField";
import { DropDownMenuOptions } from "./DropDownMenuOptions";

export const DropDownMenuIcon = ({
  handleDropDownMenuClicked,
  showDropDownMenuOptions,
  setShowDropDownMenuOptions,
  showAddContactModal,
  setShowAddContactModal,
}: {
  handleDropDownMenuClicked: () => void;
  showDropDownMenuOptions: boolean;
  setShowDropDownMenuOptions: Dispatch<SetStateAction<boolean>>;
  showAddContactModal: boolean;
  setShowAddContactModal: Dispatch<SetStateAction<boolean>>;
}) => {
  // constants
  const dispatch = useAppDispatch();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<AddContactInputs>({
    resolver: yupResolver(addContactSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // rtk query
  const [contactData, { isLoading: isAdding }] = useAddContactMutation();

  // functions
  const handleCancelButtonClicked = () => {
    setShowAddContactModal(false);
    reset();
  };

  const addContactFormOnSubmit: SubmitHandler<AddContactInputs> = async (
    data
  ) => {
    try {
      const response = await contactData({
        phone_num: data.phone_num,
      }).unwrap();

      if (response) {
        setShowAddContactModal(false);
        dispatch(setShowSuccessSnackbar(true));
        dispatch(setSuccessMessage(response.message));
        reset();
      }

      setShowAddContactModal(false);
    } catch (err) {
      if (err) {
        dispatch(
          setErrorMessage((err as ErrorMessageInterface).data.ErrorMessage)
        );
        dispatch(setShowErrorSnackbar(true));
      }
    }
  };

  return (
    <>
      <div
        className="icon-div ml-2.5 relative flex h-full w-10  px-2 py-2 cursor-pointer"
        onClick={handleDropDownMenuClicked}
      >
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          className="text-topPanelIconColor"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
          ></path>
        </svg>
      </div>
      {showDropDownMenuOptions && (
        <DropDownMenuOptions
          setShowDropDownMenuOptions={setShowDropDownMenuOptions}
          setShowAddContactModal={setShowAddContactModal}
        />
      )}

      {showAddContactModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-2xl h-auto min-h-[300px]">
            <div className="h-fit bg-teal-500 p-4 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Add Contacts</h1>
            </div>
            <form
              className="flex flex-1 items-center justify-center bg-gray-50 h-full py-2"
              onSubmit={handleSubmit(addContactFormOnSubmit)}
              autoComplete="off"
            >
              <div className="flex flex-col items-center justify-center gap-2 ">
                <InputField
                  label="Phone Number:"
                  placeholder="phone number"
                  register={register}
                  name="phone_num"
                  inputType="number"
                  errors={errors}
                  onChange={() => clearErrors("phone_num")}
                />
                <div className="flex justify-end w-full gap-3">
                  <CustomButton
                    buttonLabel="Add"
                    buttonColor="bg-blue-500"
                    hoverColor="bg-blue-600"
                    buttonType="submit"
                  />
                  <CustomButton
                    buttonLabel="Cancel"
                    buttonColor="bg-teal-500"
                    hoverColor="bg-teal-600"
                    handleButtonClicked={handleCancelButtonClicked}
                    buttonType="button"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
