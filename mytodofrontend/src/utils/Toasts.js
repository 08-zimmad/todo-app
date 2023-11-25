import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const ToastError=(message)=> {

    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  
};

export const ToastSuccess=(message)=>{
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      });
}



export const ToastInfo=(message)=>{
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER
      });
}



