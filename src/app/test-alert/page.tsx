"use client";
import { useState } from "react";
import AlertConfirm from "../components/alert_confirm";
import AlertSuccess from "../components/alert_success";
import AlertFailed from "../components/alert_failed";


export default function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertSuccess2, setShowAlertSuccess2] = useState(false);
  const [showAlertFailed, setShowAlertFailed] = useState(false);

  const handleSubmit = (status: string) => {
    if (status === "success") {
      setShowAlertSuccess(true);
    } else if (status === "failed") {
      setShowAlertFailed(true);
    }

  }
  
  return (
    <div className="flex flex-col items-center bg-tint6 h-screen">
      <button onClick={() => setShowPopup(true)} >
        Confirm
      </button>

      <button onClick={() => setShowAlertSuccess(true)} >
        Success
      </button>

      <button onClick={() => setShowAlertSuccess2(true)} >
        Success 2
      </button>

      <button onClick={() => setShowAlertFailed(true)} >
        Failed
      </button>

      <button onClick={() => handleSubmit("success")} >
        Sukses atau gagal?
      </button>

      <AlertConfirm isvisible={showPopup} onClose={() => setShowPopup(false)} message="Apakah Anda yakin menghapus data salah satu pegawai?"/>

      <AlertSuccess isvisible={showAlertSuccess} onClose={() => setShowAlertSuccess(false)} message="Data berhasil dihapus!"/>

      <AlertSuccess isvisible={showAlertSuccess2} onClose={() => setShowAlertSuccess2(false)} message="Data berhasil dihapus lagi!"/>

      <AlertFailed isvisible={showAlertFailed} onClose={() => setShowAlertFailed(false)} topMessage="Data gagal dihapus!" bottomMessage="Data tidak dapat dihapus karena terjadi kesalahan pada server."/>
    </div>
  );
}
