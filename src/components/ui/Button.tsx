import React from "react";

interface ButtonProps {
  isLoading: boolean;
  onClick: () => void;
  text: string;
  loadingText?: string; // Optional loading text to display while loading
  type?: "button" | "submit" | "reset"; // Button type
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  onClick,
  text,
  loadingText = "Loading...", // Default loading text
  type = "button", // Default type is "button"
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type} // Set the button type
      onClick={onClick}
      disabled={isLoading} // Disable button when loading
      className={`flex items-center justify-center p-2 rounded-lg text-white ${
        isLoading ? "bg-gray-500" : "bg-blue-500"
      } transition-colors duration-200`}
    >
      {isLoading ? (
        <>
          <div className="loader mr-2"></div>
          <span>{loadingText}</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
