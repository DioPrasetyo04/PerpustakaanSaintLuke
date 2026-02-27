import { AllertProps } from "@/types/allert";
import { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";
import { MdSmsFailed } from "react-icons/md";
import { BsInfoSquareFill } from "react-icons/bs";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { cardAlertVariants } from "@/variants/cardAlertVariants";

export const alertNotification = ({
    status,
    message,
    className,
    variant,
    size,
    button = false,
    modificationButton,
    childrenButton,
    onClose,
}: AllertProps) => {
    const [open, setOpen] = useState(false);

    if(!open) return null;

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    }

    const getIcon = (status: string) => {
        switch (status) {
            case "Success":
                return <BsFillPatchCheckFill className="text-green-600 text-[50px]" />;
            case "Error":
                return <BiSolidError className="text-red-600 text-[50px]" />
            case "Failed":
                return <MdSmsFailed className="text-yellow-600 text-[50px]" />
            default:
                return <BsInfoSquareFill className="text-blue-600 text-[50px]" />
        }
    }

      return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className={cn(cardAlertVariants({ variant, size, className }))}>
        <div className="flex flex-col justify-center items-center gap-y-2 p-3">
          <div className="h-[50px] w-[50px] mb-2 flex justify-center items-center">
            {getIcon(status)}
          </div>

          <div className="text-center gap-y-5 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold">{status}</h2>
            <p className="text-md font-bold">{message}</p>

            {button ? (
              <div className={`p-3 ${modificationButton}`}>
                {childrenButton}
              </div>
            ) : (
              <Button
                onClick={handleClose}
                type="button"
                className={cn(
                  status === "Success" && "bg-green-600",
                  status === "Error" && "bg-red-600",
                  status === "Failed" && "bg-yellow-600",
                  status === "Info" && "bg-blue-600"
                )}
              >
                Ok, Got it!
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
