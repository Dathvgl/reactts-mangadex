import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  options?: RegisterOptions<FieldValues, string>;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
}

function InputTSX<T extends FieldValues>(props: props<T>) {
  const { label, name, type, options, errors, register } = props;

  return (
    <>
      <div className="relative">
        <input
          {...register(name, options)}
          name={name}
          type={type ?? "text"}
          autoComplete="off"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
          {label}
        </label>
      </div>
      {errors && errors[name] && (
        <div className="text-start text-red-500">
          {errors[name]?.message?.toString()}
        </div>
      )}
    </>
  );
}

export default InputTSX;
