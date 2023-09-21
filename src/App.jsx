import { Provider } from "react-redux";
import "./App.css";
import Router from "./routes";
import store from "./stores";
import "flowbite";
import { useState } from "react";
import Auth from "./utils/auth";
import Swal from "sweetalert2";

function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  const rt = Auth.getRefreshToken();
  const auth = Auth.isAuthorization();

  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }

  if (!rt && auth) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "focus:outline-none text-white bg-secondary-navy hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
        icon: "text-secondary-soft-blue",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Sesi anda telah habis",
        text: "Silahkan login kembali",
        icon: "info",
        confirmButtonText: "Login",
      })
      .then((result) => {
        if (result.isConfirmed) {
          Auth.signOut();
          window.location.href = "/login";
        }
      });
  }

  return (
    !loading && (
      <>
        <Provider store={store}>
          <Router />
        </Provider>
      </>
    )
  );
}

export default App;
