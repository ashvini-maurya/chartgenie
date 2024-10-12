interface ICgButton {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: (e: any) => void;
  children: React.ReactNode;
  classes?: string;
}

const CgButton = ({ type, onClick, classes, children }: ICgButton) => {
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default CgButton;
