"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Arrow from "../../../../public/right_arrow.svg";
import Dropdown from "../../components/dropdown";
import axios from "axios";
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/navigation';

import AlertSuccess from "../../components/alert_success";
import AlertFailed from "../../components/alert_failed";
import UserButton from "@/app/components/user_button";

interface NurseStation {
  skrining_awal: SkriningAwal;
  skrining_gizi: SkriningGizi;
  riwayat_penyakit: RiwayatPenyakit;
  ttv: TTV;
  alergi: Alergi;
  anamnesis: Anamnesis;
}

interface SkriningAwal {
  disabilitas: boolean;
  ambulansi: boolean;
  hambatan_komunikasi: boolean;
  jalan_tidak_seimbang: boolean;
  menopang_saat_duduk: boolean;
  jalan_alat_bantu: boolean;
  hasil_cara_jalan: string;
  skala_nyeri: number;
  nyeri_berulang: string;
  sifat_nyeri: string;
}

interface SkriningGizi {
  penurunan_bb: string;
  tdk_nafsu_makan: boolean;
  diagnosis_khusus: boolean;
  nama_penyakit: string;
}

interface RiwayatPenyakit {
  rps: string;
  rpd: string;
  rpk: string;
}

interface TTV {
  kesadaran: string;
  sistole: number;
  diastole: number;
  tinggi_badan: number;
  cara_ukur_tb: string;
  berat_badan: number;
  lingkar_perut: number;
  detak_nadi: number;
  nafas: number;
  saturasi: number;
  suhu: number;
  detak_jantung: boolean;
  triage: string;
  psikososial_spirit: string;
  keterangan: string;
}

interface Alergi {
  obat: string;
  makanan: string;
  lainnya: string;
}

interface Anamnesis {
  pasien_id: number;
  dokter_id: number;
  perawat_id: number;
  keluhan_utama: string;
  keluhan_tambahan: string;
  lama_sakit: number;
}
interface PemeriksaanDokter{
  antrian_id: number;
  dokter_id: number;
  perawat_id: number;
}
export default function Dashboard() {
  const searchParams = useSearchParams();
  const id = searchParams.get('pasien_id');
  const antrian_id = searchParams.get('antrian_id');
  const poli = searchParams.get('poli');
  const created_at = searchParams.get('created_at');
  const [dokterOptions, setDokterOptions] = useState([]);
  const [perawatOptions, setPerawatOptions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isTTVAlreadyExist, setIsTTVAlreadyExist] = useState(false);
  const [imt, setImt] = useState(0);
  const [hasilImt, setHasilImt] = useState("");

  
  const router = useRouter();
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertFailed, setShowAlertFailed] = useState(false);


  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  const validateForm =   () => {
    let err: ValidationErrors = {}; 
    let isValid = true;

    // if (anamnesis.dokter_id00 === '' || isNaN(anamnesis.dokter_id)) {
    //   err.tenaga_medis = "Tenaga medis harus diisi";
    //   isValid = false;
    // }

    if(anamnesis.keluhan_utama===""){
      err.keluhan_utama = "Keluhan utama harus diisi";
      isValid = false;
    }

    if(anamnesis.lama_sakit===0 || isNaN(anamnesis.lama_sakit)){
      err.lama_sakit = "Lama sakit harus diisi";
      isValid = false;
    }

    if (skriningAwal.skala_nyeri === 0 || isNaN(skriningAwal.skala_nyeri)) {
      err.skala_nyeri = "Skala nyeri harus diisi";
      isValid = false;
    }

    if (skriningAwal.nyeri_berulang === "") {
      err.nyeri_berulang = "Nyeri berulang harus diisi";
      isValid = false;
    }

    if (skriningAwal.sifat_nyeri === "") {
      err.sifat_nyeri = "Sifat nyeri harus diisi";
      isValid = false;
    }

    if (skriningGizi.penurunan_bb === "") {
      err.penurunan_bb = "Penurunan berat badan harus diisi";
      isValid = false;
    }


    if (typeof skriningGizi.tdk_nafsu_makan !== 'boolean' || typeof skriningGizi.tdk_nafsu_makan === 'undefined') {
      err.tdk_nafsu_makan = "Tidak nafsu makan harus diisi";
      isValid = false;
    }

    if (typeof skriningGizi.diagnosis_khusus !== 'boolean' || typeof skriningGizi.diagnosis_khusus === 'undefined') {
      err.tdk_nafsu_makan = "Tidak nafsu makan harus diisi";
      isValid = false;
    }

    if (skriningGizi.nama_penyakit === "") {
      err.nama_penyakit = "Nama penyakit harus diisi";
      isValid = false;
    }

    if (ttv.kesadaran === "") {
      err.kesadaran = "Kesadaran harus diisi";
      isValid = false;
    }

    if (typeof ttv.sistole !== 'number' || ttv.sistole === 0 || isNaN(ttv.sistole)) {
      err.sistole = "Sistole harus diisi";
      isValid = false;
    }
    if(ttv.diastole === 0 || isNaN(ttv.diastole)){
      err.diastole = "Diastole harus diisi";
      isValid = false;
    }
    if(ttv.tinggi_badan === 0 || isNaN(ttv.tinggi_badan)){
      err.tinggi_badan = "Tinggi badan harus diisi";
      isValid = false;
    }
    if(ttv.berat_badan === 0 || isNaN(ttv.berat_badan)){
      err.berat_badan = "Berat badan harus diisi";
      isValid = false;
    }
    if(ttv.lingkar_perut === 0 || isNaN(ttv.lingkar_perut)){
      err.lingkar_perut = "Lingkar perut harus diisi";
      isValid = false;
    }
    if(ttv.detak_nadi === 0 || isNaN(ttv.detak_nadi)){
      err.detak_nadi = "Detak nadi harus diisi";
      isValid = false;
    }
    if(ttv.nafas === 0 || isNaN(ttv.nafas)){
      err.nafas = "Nafas harus diisi";
      isValid = false;
    }
    if(ttv.triage === ""){
      err.triage = "Triage harus diisi";
      isValid = false;
    }
    if(ttv.cara_ukur_tb === ""){
      err.cara_ukur_tb = "Cara ukur TB harus diisi";
      isValid = false;
    }
  

  
    setErrors(err);
    return isValid;
  }

  const editPage = async () =>{
    try{
      const response = await axios.get(`http://localhost:8080/ttv?find_by=pasien_id&target=${id}`);
      const data = response.data.data;
      console.log(data);
      setSkriningAwal(data.skrining_awal);
      setSkriningGizi(data.skrining_gizi);
      setRiwayatPenyakit(data.riwayat_penyakit);
      setTtv(data.ttv);
      setAlergi(data.alergi);
      setAnamnesis(data.anamnesis);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const checkTTVExist = async () => {
    try{
      const responses = await axios.get(
        `http://localhost:8080/ttv?find_by=pasien_id&target=${id}`
      );
      console.log("response" + responses.data !== null)
      setIsTTVAlreadyExist(responses.data !== null)
      return responses.data !== null;
    }
    catch(error){
      console.log("haiaiai")
      console.error("error", error);
    }
    finally{
      return false;
    }
  };

  


  useEffect(() => {
    // checkTTVExist().then((exist) => setIsTTVAlreadyExist(exist));
    console.log(isTTVAlreadyExist);
    if(isTTVAlreadyExist){
      console.log("mas7uk");
      editPage();
    }
  }, [isTTVAlreadyExist]);


  const fetchDokterOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/dokter?find_by=&target="
      );
      const dokterData = response.data.data;
      const options = dokterData.map(
        (dokter: { nama: any; user_id: any }) => ({
          label: `dr. ${dokter.nama}`,
          value: dokter.user_id,
        })
      );
      setDokterOptions(options);
      console.log(options);
    } catch (error) {
      console.error("Error fetching dokter data:", error);
    }
  };

  const fetchPerawatOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/perawat?find_by=&target="
      );
      const perawatData = response.data.data;
      const options = perawatData.map(
        (perawat: { nama: any; user_id: any }) => ({
          label: `sus. ${perawat.nama}`,
          value: perawat.user_id,
        })
      );
      setPerawatOptions(options);
      console.log(options);
    } catch (error) {
      console.error("Error fetching perawat data:", error);
    }
  };

  useEffect(() => {
    fetchDokterOptions();
    fetchPerawatOptions();
  }, []);

  const delay = (delayInms : any) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    validateForm();
    console.log(ttv.triage);
    console.log(ttv.cara_ukur_tb);
    console.log(ttv.kesadaran);
    // console.log(anamnesis.keluhan_utama);
    const requestData = {
      skrining_awal: skriningAwal,
      skrining_gizi: skriningGizi,
      riwayat_penyakit: riwayatPenyakit,
      ttv: ttv,
      alergi: alergi,
      anamnesis: anamnesis,
    };
    
    // console.log(requestData);
    const formIsValid = await validateForm();
    console.log(formIsValid );

    if(formIsValid){
      try {
        const response = await axios.post("http://localhost:8080/ttv", requestData);
        console.log(response);
        // alert("Data TTV berhasil disimpan");
  
        console.log(PemeriksaanDokter);
        const response2 = await axios.post("http://localhost:8080/pemeriksaan_dokter", PemeriksaanDokter);
        console.log(response2);
        // alert("Data Pemeriksaan Dokter berhasil disimpan");
        const changeStatusById = {
          "key": antrian_id ? antrian_id.toString() : '',
          "value": "pemeriksaan_dokter"
        }
        console.log(changeStatusById);
        // const response3 = await axios.patch("http://localhost:8080/antrian?change_type=status&change_by=id", changeStatusById);
        // console.log(response3);
        setShowAlertSuccess(true);
        await delay(3000);
        // alert("Status antrian dengan antrian_id: " + antrian_id + " berhasil diubah");
        window.location.href = "/perawat";
  
      } catch (error) {
        console.error('Error sending data:', error);
        setShowAlertFailed(true);
      }
    }
  }
  const antrianId = "1";


  const [selectedOption, setSelectedOption] = useState(null);

  const antrianAPI = "http://localhost:8080/antrian?find_by=id&target=";
  const additionalDataAPI = "http://localhost:8080/pasien?find_by=id&target=";

  const [data, setData] = useState<any>(null);
  const [pasien, setPasien] = useState<any>(null);
  const [tahun, setTahun] = useState<any>(0);
  const [bulan, setBulan] = useState<any>(0);
  const [hari, setHari] = useState<any>(0);
  const [skriningGizi, setSkriningGizi] = useState<SkriningGizi>({
    penurunan_bb: '',
    tdk_nafsu_makan: false,
    diagnosis_khusus: false,
    nama_penyakit: '',
  });
  const [skriningAwal, setSkriningAwal] = useState<SkriningAwal>({
    disabilitas: false,
    ambulansi: false,
    hambatan_komunikasi: false,
    jalan_tidak_seimbang: false,
    menopang_saat_duduk: false,
    jalan_alat_bantu: false,
    hasil_cara_jalan: "kurang baik",
    skala_nyeri: 0,
    nyeri_berulang: "",
    sifat_nyeri: "",
  });
  const [anamnesis, setAnamnesis] = useState<Anamnesis>({
    pasien_id: 1,
    dokter_id: 1,
    perawat_id: 2,
    keluhan_utama: "",
    keluhan_tambahan: "",
    lama_sakit: 0,
  });
  const [ttv, setTtv] = useState<TTV>({
    kesadaran: "",
    sistole: 0,
    diastole: 0,
    tinggi_badan: 0,
    cara_ukur_tb: "",
    berat_badan: 0,
    lingkar_perut: 0,
    detak_nadi: 0,
    nafas: 0,
    saturasi: 0,
    suhu: 0,
    detak_jantung: false,
    triage: "",
    psikososial_spirit: "",
    keterangan: "",
  });
  const [alergi, setAlergi] = useState({
    obat: "",
    makanan: "",
    lainnya: "",
  });

  const [riwayatPenyakit, setRiwayatPenyakit] = useState<RiwayatPenyakit>({
    rps: "",
    rpd: "",
    rpk: "",
  });
  const [PemeriksaanDokter, setPemeriksaanDokter] = useState<PemeriksaanDokter>({
    antrian_id: antrian_id ? +antrian_id : 1,
    dokter_id: 1,
    perawat_id: 2,
  });

  useEffect(()=> {
    // const kesadaranElement = document.getElementById("kesadaran");
    const sistoleElement = document.getElementById("sistole");
    const diastole = document.getElementById("diastole");
    const tinggiElement = document.getElementById("tinggi_badan");
    const beratElement = document.getElementById("berat_badan");
    const lingkarPerutElement = document.getElementById("lingkar_perut");
    const detakNadiElement = document.getElementById("detak_nadi");
    const nafasElement = document.getElementById("nafas");
    const saturasiElement = document.getElementById("saturasi");
    const suhuElement = document.getElementById("suhu");
    const detakJantungElement = document.getElementsByName("detak_jantung");
    const triageElement = document.getElementById(ttv.triage);
    const psikososialSpiritElement = document.getElementById("psikososial_spirit");
    const keteranganElement = document.getElementById("keterangan");
    // const kesadaranElement = document.evaluate("/html/body/div/div[3]/form/div[3]/div[1]/div[4]/div/button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    // const caraUkurElement = document.evaluate("/html/body/div/div[3]/form/div[3]/div[1]/div[8]/div/button", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    // if (kesadaranElement){
    //   kesadaranElement.singleNodeValue.textContent = ttv.kesadaran;

    // }

    // if (caraUkurElement){
    //   caraUkurElement.singleNodeValue.textContent = ttv.cara_ukur_tb;
    // }
    // let value = kesadaranElement.singleNodeValue ? kesadaranElement.singleNodeValue.textContent : null;
    // console.log(value)
    if (isTTVAlreadyExist){
      if (triageElement) {
        triageElement.checked = true;
      }

      if (sistoleElement) {
        sistoleElement.value = ttv.sistole;
      }

      if (diastole) {
        diastole.value = ttv.diastole;
      }

      if (tinggiElement) {
        tinggiElement.value = ttv.tinggi_badan;
      }

      if (beratElement) {
        beratElement.value = ttv.berat_badan;
      }

      if (lingkarPerutElement) {
        lingkarPerutElement.value = ttv.lingkar_perut;
      }

      if (detakNadiElement) {
        detakNadiElement.value = ttv.detak_nadi;
      }

      if (nafasElement) {
        nafasElement.value = ttv.nafas;
      }

      if (saturasiElement) {
        saturasiElement.value = ttv.saturasi;
      }

      if (suhuElement) {
        suhuElement.value = ttv.suhu;
      }

      if (detakJantungElement) {
        if (ttv.detak_jantung) {
          detakJantungElement[0].checked = true;
        } else {
          detakJantungElement[1].checked = true;
        }
      }
      if(psikososialSpiritElement){
        psikososialSpiritElement.value = ttv.psikososial_spirit;
      }
      if (keteranganElement) {
        keteranganElement.value = ttv.keterangan;
      }}
    }, [ttv]);

    useEffect(()=> {
      const rpsElement = document.getElementById("rps");
      const rpdElement = document.getElementById("rpd");
      const rpkElement = document.getElementById("rpk");
      if(rpsElement && rpdElement && rpkElement){
        rpsElement.value = riwayatPenyakit.rps;
        rpdElement.value = riwayatPenyakit.rpd;
        rpkElement.value = riwayatPenyakit.rpk;
      }
    }, [riwayatPenyakit]);

useEffect(() =>{
const obatElement = document.getElementById("obat");
const makananElement = document.getElementById("makanan");
const lainnyaElement = document.getElementById("lainnya");
if (obatElement && makananElement && lainnyaElement){
  obatElement.value = alergi.obat;
  makananElement.value = alergi.makanan;
  lainnyaElement.value = alergi.lainnya;
}
}, [alergi]);
    

    useEffect(()=> {
      const disabilitasElement = document.getElementsByName("disabilitas");
      const ambulansiElement = document.getElementById("ambulansi");
      const hambatanKomunikasiElement = document.getElementsByName("hambatan_komunikasi");
      const jalanTidakSeimbangElement = document.getElementsByName("sempoyongan");
      const menopangSaatDudukElement = document.getElementsByName("duduk_menopang");
      const jalanAlatBantuElement = document.getElementsByName("alat_bantu");
      const skalaNyeriElement = document.getElementById(skriningAwal.skala_nyeri.toString());      const nyeriBerulangElement = document.getElementById("nyeri_berulang");
      const sifatNyeriElement = document.getElementById("sifat_nyeri");
     if (isTTVAlreadyExist){
      if (skalaNyeriElement) {
  skalaNyeriElement.checked = true;
}

if (nyeriBerulangElement) {
  nyeriBerulangElement.value = skriningAwal.nyeri_berulang;
}

if (sifatNyeriElement) {
  sifatNyeriElement.value = skriningAwal.sifat_nyeri;
}

if (disabilitasElement) {
  if (skriningAwal.disabilitas) {
    disabilitasElement[0].checked = true;
  } else {
    disabilitasElement[1].checked = true;
  }
}

if (hambatanKomunikasiElement) {
  if (skriningAwal.hambatan_komunikasi) {
    hambatanKomunikasiElement[0].checked = true;
  } else {
    hambatanKomunikasiElement[1].checked = true;
  }
}

if (jalanTidakSeimbangElement) {
  if (skriningAwal.jalan_tidak_seimbang) {
    jalanTidakSeimbangElement[0].checked = true;
  } else {
    jalanTidakSeimbangElement[1].checked = true;
  }
}

if (menopangSaatDudukElement) {
  if (skriningAwal.menopang_saat_duduk) {
    menopangSaatDudukElement[0].checked = true;
  } else {
    menopangSaatDudukElement[1].checked = true;
  }
}

if (jalanAlatBantuElement) {
  if (skriningAwal.jalan_alat_bantu) {
    jalanAlatBantuElement[0].checked = true;
  } else {
    jalanAlatBantuElement[1].checked = true;
  }
}

if (ambulansiElement){
  ambulansi.value = skriningAwal.ambulansi ? 'ya' : 'tidak';
}}
    },[skriningAwal]);

    useEffect(()=> {
      const penurunanBbElement = document.querySelector(`input[name="penurunan_bb"][value="${skriningGizi.penurunan_bb}"]`);
      console.log(penurunanBbElement)
      const tdkNafsuMakanElement = document.getElementsByName("tdk_nafsu_makan");
      const diagnosisKhususElement = document.getElementsByName("diagnosis_khusus");
      const namaPenyakitElement = document.getElementById("nama_penyakit");
      if(isTTVAlreadyExist){
     if(namaPenyakitElement) {
  namaPenyakitElement.value = skriningGizi.nama_penyakit;
}

if(penurunanBbElement) {
  penurunanBbElement.checked = true;
}

if(tdkNafsuMakanElement) {
  if (skriningGizi.tdk_nafsu_makan) {
    tdkNafsuMakanElement[0].checked = true;
  } else {
    tdkNafsuMakanElement[1].checked = true;
  }
}

if(diagnosisKhususElement) {
  if (skriningGizi.diagnosis_khusus) {
    diagnosisKhususElement[0].checked = true;
  } else {
    diagnosisKhususElement[1].checked = true;
  }
}
}}, [skriningGizi]);

  useEffect(() => {
    fetchDataPasien();
    if (isTTVAlreadyExist) {
      console.log("masuk");
      editPage();
    }
  }, [data]);

  useEffect(() =>{
    checkTTVExist();
    console.log(122121)
  }, []);


  const fetchData = async () => {
    let arr: Array<any> = [];

    try {
      const response = await axios.get(`${antrianAPI}${antrianId}`);
      const data1 = response.data;
      const data = data1.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    if(ttv.berat_badan>0 && ttv.tinggi_badan>0){
      const bmi = ttv.berat_badan / (ttv.tinggi_badan / 100) ** 2;
      console.log(bmi);
      setImt(bmi);
    }
    console.log(ttv.berat_badan, ttv.tinggi_badan);
  },[ttv.tinggi_badan, ttv.berat_badan]);

  useEffect(()=>{
    if(imt<=0){
      setHasilImt("-");
      return;
    }else if(imt<18.5){
      console.log("Underweight");
      setHasilImt("Underweight");
    }else if(imt>=18.5 && imt<=24.9){
      console.log("Normal");
      setHasilImt("Normal");
    }else if(imt>=25 && imt<=29.9){
      console.log("Overweight");
      setHasilImt("Overweight");
    }else{
      console.log("Obese");
      setHasilImt("Obese");
    }
  },[imt]);

  const fetchDataPasien = async () => {

      try {
        const response = await axios.get(
          `${additionalDataAPI}${id}`
        );
        const responseData = response.data;
        const fetchedData = responseData.data;
        console.log(fetchedData);
        setPasien(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
  };


  function calculateAge(dateOfBirth: string) {
    const dob = new Date(dateOfBirth);
    // console.log("dob", dob);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    const years = age;

    let months;
    if (today.getMonth() < dob.getMonth()) {
      months = 12 - dob.getMonth() + today.getMonth();
    } else {
      months = today.getMonth() - dob.getMonth();
    }

    let days;
    if (today.getDate() < dob.getDate()) {
      const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
      const daysInMonth = tempDate.getDate();
      days = daysInMonth - dob.getDate() + today.getDate();
    } else {
      days = today.getDate() - dob.getDate();
    }

    return { years, months, days };
  }

  const options = [
    { label: "dr. Seni", value: "dr. Seni" },
    { label: "dr. Budi", value: "dr. Budi" },
    { label: "dr. Toto", value: "dr. Toto" },
  ];

  const kesadaranOptions = [
    { label: "Compos Mentis", value: "Compos Mentis" },
    { label: "Somnolen", value: "Somnolen" },
    { label: "Sopor", value: "Sopor" },
    { label: "Coma", value: "Coma" },
  ];

  const cara_ukur_tbOptions = [
    { label: "Berdiri", value: "Berdiri" },
    { label: "Berbaring", value: "Berbaring" },
  ];
  const handleInputSkriningGizi = (e: any) => {
    const target  = e.target.name;
    const boolVal = e.target.value === "ya";
    const intVal = parseInt(e.target.value);
    const isBoolOpton = target === "tdk_nafsu_makan" || target === "diagnosis_khusus";
    const isIntOption = target === "penurunan_bb";
    setSkriningGizi({ ...skriningGizi, [e.target.name]: 
      (isBoolOpton)?boolVal:(isIntOption)?intVal:e.target.value });
  }
  const handleOptionClick = (option: any) => {
    setSelectedOption(option.value);
  };
  const handleCaraUkurTbDropdown = (option: any) => {
    setTtv({ ...ttv, cara_ukur_tb: option.value });
  };

  const handleKesadaranDropdown = (option: any) => {
    setTtv({ ...ttv, kesadaran: option.value });
  };

  const handleInputTTV = (e: any) => {
    const isIntOption = 
    e.target.name === "saturasi" || e.target.name === "nafas" || e.target.name === "detak_nadi"||
    e.target.name === "berat_badan" || e.target.name === "tinggi_badan" || e.target.name === "diastole"||
    e.target.name === "sistole" || e.target.name === "suhu"|| e.target.name === "lingkar_perut";
    const intVal = parseInt(e.target.value);
    setTtv({ ...ttv, [e.target.name]: (isIntOption)?intVal:e.target.value });
  };
  const handleInputAlergi = (e: any) => {
    setAlergi({ ...alergi, [e.target.name]: e.target.value });
  };

  const handleDetakJantung = (e: any) => {
    setTtv({ ...ttv, detak_jantung: e.target.value === "regular"});
  };

  const handleTriage = (e: any) => {
    setTtv({ ...ttv, triage: e.target.value });
  };

  const handleTenagaMedisDropdown = (option: any) => {
    setAnamnesis({ ...anamnesis, dokter_id: option.value });
  };

  const handleAsistenPerawatDropdown = (option: any) => {
    setAnamnesis({ ...anamnesis, perawat_id: option.value });
  };

  const handleKeluhanUtama = (e: any) => {
    setAnamnesis({ ...anamnesis, keluhan_utama: e.target.value });
  };

  const handleKeluhanTambahan = (e: any) => {
    setAnamnesis({ ...anamnesis, keluhan_tambahan: e.target.value });
  };

  const handleInputRiwayatPenyakit = (e: any) => {
    setRiwayatPenyakit({ ...riwayatPenyakit, [e.target.name]: e.target.value });
  };
  
  const handleLamaSakit = (e: any) => {
    const { name, value } = e.target;

    switch (name) {
      case "tahun":
        setTahun(value);
        break;
      case "bulan":
        setBulan(value);
        break;
      case "hari":
        setHari(value);
        break;
      default:
        break;
    }
    const totalHari = tahun * 365 + bulan * 30 + hari * 1;
    setAnamnesis({ ...anamnesis, lama_sakit: totalHari });
  };

  const handleDisabilitas = (e: any) => {

    setSkriningAwal({ ...skriningAwal, disabilitas: (e.target.value === "ya") });
  };

  const handleAmbulansi = (e: any) => {
    setSkriningAwal({ ...skriningAwal, ambulansi: (e.target.value === "ya") });
  };

  const handleHambatanKomunikasi = (e: any) => {
    setSkriningAwal({ ...skriningAwal, hambatan_komunikasi: (e.target.value === "ya")  });
  };

  const handleJalanTidakSeimbang = (e: any) => {
    setSkriningAwal({ ...skriningAwal, jalan_tidak_seimbang: (e.target.value === "ya")  });
  };

  const handleMenopangSaatDuduk = (e: any) => {
    setSkriningAwal({ ...skriningAwal, menopang_saat_duduk:(e.target.value === "ya")  });
  };

  const handleAlatBantu = (e: any) => {
    setSkriningAwal({ ...skriningAwal, jalan_alat_bantu: (e.target.value === "ya")  });
  };
  
  const handleSkalaNyeri = (e: any) => {
    const intvalue = parseInt(e.target.value);
    setSkriningAwal({ ...skriningAwal, [e.target.name]: intvalue });
  }

  

  return (
    <div className="bg-tint6 h-full flex flex-col">
      <div className="flex justify-end pr-12 pt-10">
                <UserButton />
                </div>
      <div className=" mt-10 font-poppins font-bold text-5xl ml-20 text-shade5">
        TANDA-TANDA VITAL PASIEN
      </div>
      <div className=" flex flex-row ml-20 mt-14">
        <div>
          <div className=" bg-shade2 rounded-3xl px-10 py-10 mr-14 mb-5">
            <div className=" mb-7 text-3xl font-poppins font-semibold leading-10">
              Data Pasien
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Tanggal
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {created_at}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Poli
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                     {poli}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      No eRM
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && <p>{pasien.no_erm}</p>}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      NIK
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && <p>{pasien.nik}</p>}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Nama Pasien
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && <p>{pasien.nama}</p>}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Usia
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && (
                        <p>
                          {calculateAge(pasien.tanggal_lahir).years} tahun{" "}
                          {calculateAge(pasien.tanggal_lahir).months} bulan{" "}
                          {calculateAge(pasien.tanggal_lahir).days} hari{" "}
                        </p>
                      )}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mr-9 mb-3">
                      Golongan Darah
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && <p>{pasien.golongan_darah}</p>}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Penjamin
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && (
                        <p>
                          {pasien.penjamin} / {pasien.no_penjamin}
                        </p> /* TODO: jenis pembayaran belum jelas ada dimana */
                      )}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      Alamat
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mb-3">
                      {pasien && <p>{pasien.alamat}</p>}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" bg-tint1 mr-14 rounded-3xl px-10 py-10 mb-7">
            <div className=" text-white text-3xl font-semibold font-poppins leading-10 mb-7">
              Rekam Medis Kunjungan
            </div>
            <table>
              <tbody>
                <tr
                  className="mb-3"
                  onClick={() => (window.location.href = "/")}
                >
                  <td>
                    <p className="text-white font-poppins text-xl font-normal mr-11">
                      24/02/2023
                    </p>
                    <p className="text-white font-poppins text-xl font-normal">
                      Bidan
                    </p>
                  </td>
                  <td>
                    <p className="text-white font-poppins text-xl font-normal">
                      Diagnosa:
                    </p>
                    <p className="text-white font-poppins text-xl font-normal w-56">
                      Migraine PRIMER BARU
                    </p>
                  </td>
                  <td>
                    <button>
                      <Image
                        src={Arrow}
                        alt="Arrow"
                        width={11}
                        height={20}
                        className=" ml-3"
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form className=" mr-20 " onSubmit={handleSubmit}>
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-8">
            <div
              data-testid="tenaga-medis"
              className="flex flex-row justify-between items-center mb-4"
            >
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold"
              >
                Tenaga Medis
                <span className="text-[#D66A63]"> *</span>
              </label>
              <Dropdown
                id="tenaga_medis"
                className="w-2/3"
                options={dokterOptions}
                onSelect={handleTenagaMedisDropdown}
                // required
              />
            </div>
            {errors.tenaga_medis && <p className="text-[#D66A63]">{errors.tenaga_medis}</p>}
            <div
              className="flex flex-row justify-between items-center mb-4"
              data-testid="asisten-perawat"
            >
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Asisten Perawat
              </label>
              <Dropdown
                id="asisten_perawat"
                className="w-2/3"
                options={perawatOptions}
                onSelect={handleAsistenPerawatDropdown}
              />
            </div>
  
            <div className="flex flex-row justify-between items-center mb-4">
              <label
                htmlFor="keluhan_utama"
                className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold"
              >
                Keluhan Utama
                <span className="text-[#D66A63]"> *</span>
              </label>
              <textarea
                data-testid="keluhan-utama"
                name="keluhan_utama"
                id="keluhan_utama"
                onChange={handleKeluhanUtama}
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Pisahkan dengan koma"
                // required
              />
            </div>
            {errors.keluhan_utama && <p className="text-[#D66A63]">{errors.keluhan_utama}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label
                htmlFor="keluhan_tambahan"
                className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold"
              >
                Keluhan Tambahan
              </label>
              <textarea
                data-testid="keluhan-tambahan"
                name="keluhan_tambahan"
                id="keluhan_tambahan"
                onChange={handleKeluhanTambahan}
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Pisahkan dengan koma"
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Lama Sakit
                <span className="text-[#D66A63]"> *</span>
              </label>
              <div className="w-2/3 flex flex-row gap-4">
                <div className="relative w-1/3">
                  <input
                    data-testid="lama-sakit-tahun"
                    type="text"
                    name="tahun"
                    id="tahun"
                    onChange={handleLamaSakit}
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    // required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Thn
                  </span>
                </div>
                <div className="relative w-1/3">
                  <input
                    data-testid="lama-sakit-bulan"
                    type="text"
                    name="bulan"
                    id="bulan"
                    onChange={handleLamaSakit}
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    // required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Bln
                  </span>
                </div>
                <div className="relative w-1/3">
                  <input
                    data-testid="lama-sakit-hari"
                    type="text"
                    name="hari"
                    onChange={handleLamaSakit}
                    id="hari"
                    className="w-full h-12 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                    placeholder="0"
                    // required
                  />
                  <span className="absolute right-0 top-0 bottom-0 bg-shade4 border border-l-0 rounded-r-2xl flex items-center px-3 text-sm text-tint7">
                    Hr
                  </span>
                </div>
              </div>
            </div>
            {errors.lama_sakit && <p className="text-[#D66A63]">{errors.lama_sakit}</p>}
          </div>
          
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-8">
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Status Fungsional Pasien
            </label>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Disabilitas
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    onChange={handleDisabilitas}
                    name="disabilitas"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="disabilitas-tidak"
                    type="radio"
                    id="tidak"
                    onChange={handleDisabilitas}
                    name="disabilitas"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Ambulansi
              </label>
              <input
                data-testid="ambulansi"
                type="text"
                onChange={handleAmbulansi}
                name="ambulasi"
                id="ambulasi"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Hambatan Komunikasi
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="hambatan_komunikasi"
                    onChange={handleHambatanKomunikasi}
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="hambatan-komunikasi-tidak"
                    type="radio"
                    id="tidak"
                    onChange={handleHambatanKomunikasi}
                    name="hambatan_komunikasi"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Risiko Jatuh
            </label>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Tidak seimbang, Sempoyongan, Limbung
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="sempoyongan"
                    onChange={handleJalanTidakSeimbang}
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="sempoyongan-tidak"
                    type="radio"
                    id="tidak"
                    name="sempoyongan"
                    onChange={handleJalanTidakSeimbang}
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Menopang saat duduk : Tampak memegang pinggiran kursi atau meja
                / benda lain sebagaipenopang saat akan duduk
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    onChange={handleMenopangSaatDuduk}
                    name="duduk_menopang"
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="duduk-menopang-tidak"
                    type="radio"
                    id="tidak"
                    onChange={handleMenopangSaatDuduk}
                    name="duduk_menopang"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Jalan menggunakan alat bantu ( Kruk, Tripod, Kursi Roda, Orang
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="alat_bantu"
                    onChange={handleAlatBantu}
                    value="ya"
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="alat-bantu-tidak"
                    type="radio"
                    id="tidak"
                    onChange={handleAlatBantu}
                    name="alat_bantu"
                    value="tidak"
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>

            {/* SKRALA NYERI DAN SKRINING GIZI  */}
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Skala Nyeri
            </label>
            <div className="flex flex-row  items-center mb-4 justify-center">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Skala Nyeri<span className="text-[#D66A63]"> *</span>
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex flex-col items-center justify-center text-center"
                data-testid="skala-nyeri">
                >
                  <label
                    htmlFor="1"
                    className=" text-white font-Poppins font-normal "
                  >
                    1
                  </label>
                  <input type="radio" id="1" name="skala_nyeri" value="1" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="2"
                    className=" text-white font-Poppins font-normal "
                  >
                    2
                  </label>
                  <input type="radio" id="2" name="skala_nyeri" value="2" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="3"
                    className=" text-white font-Poppins font-normal "
                  >
                    3
                  </label>
                  <input type="radio" id="3" name="skala_nyeri" value="3" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="4"
                    className=" text-white font-Poppins font-normal "
                  >
                    4
                  </label>
                  <input type="radio" id="4" name="skala_nyeri" value="4" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="5"
                    className=" text-white font-Poppins font-normal "
                  >
                    5
                  </label>
                  <input type="radio" id="5" name="skala_nyeri" value="5" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="6"
                    className=" text-white font-Poppins font-normal "
                  >
                    6
                  </label>
                  <input type="radio" id="6" name="skala_nyeri" value="6" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="7"
                    className=" text-white font-Poppins font-normal "
                  >
                    7
                  </label>
                  <input type="radio" id="7" name="skala_nyeri" value="7" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="8"
                    className=" text-white font-Poppins font-normal "
                  >
                    8
                  </label>
                  <input type="radio" id="8" name="skala_nyeri" value="8" onChange={handleSkalaNyeri} />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="9"
                    className=" text-white font-Poppins font-normal "
                  >
                    9
                  </label>
                  <input type="radio" id="9" name="skala_nyeri" value="9" onChange={handleSkalaNyeri}/>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <label
                    htmlFor="y10"
                    className=" text-white font-Poppins font-normal "
                  >
                    10
                  </label>
                  <input type="radio" id="10" name="skala_nyeri" value="10" onChange={handleSkalaNyeri}/>
                </div>
              </div>
            </div>
            {errors.skala_nyeri && <p className="text-[#D66A63]">{errors.skala_nyeri}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Kapan Nyeri Berulang<span className="text-[#D66A63]"> *</span>
              </label>
              <input
                data-testid="nyeri-berulang"
                type="text"
                name="nyeri_berulang"
                id="nyeri_berulang"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Tidak Ada"
                onChange={handleSkalaNyeri}
              />
            </div>
            {errors.nyeri_berulang && <p className="text-[#D66A63]">{errors.nyeri_berulang}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Sifat Nyeri<span className="text-[#D66A63]"> *</span>
              </label>
              <input
                data-testid="sifat-nyeri"
                type="text"
                name="sifat_nyeri"
                id="sifat_nyeri"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Tidak Ada"
                onChange={handleSkalaNyeri}
              />
            </div>
            {errors.sifat_nyeri && <p className="text-[#D66A63]">{errors.sifat_nyeri}</p>}
            <label className="text-shade6 font-bold text-xl m-4 underline">
              Skrining Gizi
            </label>
            <div className="flex flex-row  items-center mb-4 justify-center">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Apakah pasien mengalami penurunan berat badan yang tidak
                diinginkan dalam kurun waktu 6 bulan terakhir{" "}
                <span className="text-[#D66A63]"> *</span>
              </label>
              <div className="w-2/3 flex flex-col gap-2  text-start justify-start items-start">
                <div className="flex flex-row items-center justify-center text-center">
                  <input
                    data-testid="penurunan-bb-tdk-tahu"
                    type="radio"
                    id="tdk_tahu"
                    name="penurunan_bb"
                    value="tidak tahu"
                    onChange={handleInputSkriningGizi}
                  />
                  <label
                    htmlFor="tdk_tahu"
                    className=" text-white font-Poppins font-normal ml-4 "
                  >
                    Tidak tahu / terasa baju lebih longgar
                  </label>
                </div>
                <div className="flex flex-row items-center justify-center text-center">
                  <input type="radio" id="1-5" name="penurunan_bb" value="1-5" onChange={handleInputSkriningGizi} />
                  <label
                    htmlFor="1-5"
                    className=" text-white font-Poppins font-normal ml-4 "
                  >
                    Penurunan berat badan 1 - 5 kg
                  </label>
                </div>
                <div className="flex flex-row items-center justify-center text-center">
                  <input
                    type="radio"
                    id="6-10"
                    name="penurunan_bb"
                    value="6-10"
                    onChange={handleInputSkriningGizi}
                  />
                  <label
                    htmlFor="6-10"
                    className=" text-white font-Poppins font-normal ml-4 "
                  >
                    Penurunan berat badan 6 - 10 kg
                  </label>
                </div>
                <div className="flex flex-row items-center justify-center text-center">
                  <input
                    type="radio"
                    id="11-15"
                    name="penurunan_bb"
                    value="11-15"
                    onChange={handleInputSkriningGizi}
                  />
                  <label
                    htmlFor="11-15"
                    className=" text-white font-Poppins font-normal ml-4 "
                  >
                    Penurunan berat badan 11 - 15 kg
                  </label>
                </div>
                <div className="flex flex-row items-center justify-center text-center">
                  <input type="radio" id=">15" name="penurunan_bb" value=">15" onChange={handleInputSkriningGizi}/>
                  <label
                    htmlFor=">15"
                    className=" text-white font-Poppins font-normal ml-4 "
                  >
                    Penurunan berat badan {">"} 15 kg
                  </label>
                </div>
              </div>
            </div>
            {errors.penurunan_bb && <p className="text-[#D66A63]">{errors.penurunan_bb}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
            <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
            Apakah asupan makan berkurang karena tidak nafsu makan <span className="text-[#D66A63]"> *</span>
            </label>
            <div className="w-2/3 flex flex-row gap-10 items-center">
              <div className="flex items-center">
                <input
                  data-testid="tdk-nafsu-makan-ya"
                  type="radio"
                  id="ya"
                  name="tdk_nafsu_makan"
                  value="true"
                  onChange={handleInputSkriningGizi}
                />
                <label
                  htmlFor="ya"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Ya
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="tidak"
                  name="tdk_nafsu_makan"
                  value="false"
                  onChange={handleInputSkriningGizi}
                />
                <label
                  htmlFor="tidak"
                  className="text-white font-Poppins font-normal ml-4"
                >
                  Tidak
                </label>
              </div>
            </div>
          </div>
          {errors.tdk_nafsu_makan && <p className="text-[#D66A63]">{errors.tdk_nafsu_makan}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Pasien dengan diagnosis khusus{" "}
                <span className="text-[#D66A63]"> *</span>
              </label>
              <div className="w-2/3 flex flex-row gap-10 items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ya"
                    name="diagnosis_khusus"
                    value="true"
                    onChange={handleInputSkriningGizi}
                  />
                  <label
                    htmlFor="ya"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Ya
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    data-testid="diagnosis-khusus-tidak"
                    type="radio"
                    id="tidak"
                    name="diagnosis_khusus"
                    value="false"
                    onChange={handleInputSkriningGizi}
                  />
                  <label
                    htmlFor="tidak"
                    className="text-white font-Poppins font-normal ml-4"
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
            {errors.diagnosis_khusus && <p className="text-[#D66A63]">{errors.diagnosis_khusus}</p>}
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Nama Penyakit <span className="text-[#D66A63]"> *</span>
              </label>
              <input
                data-testid="nama-penyakit"
                type="text"
                name="nama_penyakit"
                id="nama_penyakit"
                className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Tidak Ada"
                onChange={handleInputSkriningGizi}
              />
            </div>
            {errors.nama_penyakit && <p className="text-[#D66A63]">{errors.nama_penyakit}</p>}
          </div>
          
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-11 grid grid-cols-2 gap-4">
            <div className="mr-4 px-5 ">
              <label className="text-shade6 font-bold text-xl mv-4 underline">
                Riwayat Penyakit
              </label>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPS
                </label>
                <input
                  type="text"
                  name="rps"
                  id="rps"
                  onChange={handleInputRiwayatPenyakit}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                  
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPD
                </label>
                <input
                  type="text"
                  name="rpd"
                  id="rpd"
                  onChange={handleInputRiwayatPenyakit}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  RPK
                </label>
                <input
                  type="text"
                  name="rpk"
                  id="rpk"
                  onChange={handleInputRiwayatPenyakit}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  placeholder="Ada / Tidak Ada"
                />
              </div>
              <br />
              <br />
              <div className="flex flex-row justify-between items-center mb-4"
                data-testid="kesadaran">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Kesadaran <span className="text-[#D66A63]"> *</span>
                </label>
                <Dropdown
                  className="w-2/3"
                  options={kesadaranOptions}
                  onSelect={handleKesadaranDropdown}
                  // required
                />
              </div>
              {errors.kesadaran && <p className="text-[#D66A63]">{errors.kesadaran}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Sistole <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="sistole"
                  type="text"
                  name="sistole"
                  id="sistole"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl  border border-neutral-200 text-shade7"
                  
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">
                  Mm
                </span>
              </div>
              {errors.sistole && <p className="text-[#D66A63]">{errors.sistole}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Diastole <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="diastole"
                  type="text"
                  name="diastole"
                  id="diastole"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">
                  Hg
                </span>
              </div>
              {errors.diastole && <p className="text-[#D66A63]">{errors.diastole}</p>}
              
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Tinggi Badan <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="tinggi-badan"
                  type="text"
                  name="tinggi_badan"
                  onChange={handleInputTTV}
                  id="tinggi_badan"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">
                  Cm
                </span>
              </div>
              {errors.tinggi_badan && <p className="text-[#D66A63]">{errors.tinggi_badan}</p>}
              <div className="flex flex-row justify-between items-center mb-4"
              data-testid="cara-ukur-tb"
              >
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Cara Ukur TB <span className="text-[#D66A63]"> *</span>
                </label>
                <Dropdown
                  className="w-2/3"
                  options={cara_ukur_tbOptions}
                  onSelect={handleCaraUkurTbDropdown}
                  
                />
              </div>
              {errors.cara_ukur_tb && <p className="text-[#D66A63]">{errors.cara_ukur_tb}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Berat Badan <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="berat-badan"
                  type="text"
                  name="berat_badan"
                  id="berat_badan"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">
                  Kg
                </span>
              </div>
              {errors.berat_badan && <p className="text-[#D66A63]">{errors.berat_badan}</p>}
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  IMT <span className="text-[#D66A63]"> *</span>
                </label>
                {/* <input
                  type="text"
                  name="imt"
                  id="imt"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                /> */}
                 <p className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7">{imt.toString().slice(0,5)}</p>
              </div>
              {/* {errors.imt && <p>{errors.imt}</p>} */}
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Hasil IMT 
                </label>
                {/* <input
                  type="text"
                  name="hasil_imt"
                  onChange={handleInputTTV}
                  id="hasil_imt"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                /> */}
                 <p className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7">{hasilImt}</p>
              </div>
            </div>
            <div>
              <label className="text-shade6 font-bold text-xl mv-4 underline">
                Alergi
              </label>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Obat
                </label>
                <input
                  type="text"
                  name="obat"
                  id="obat"
                  onChange={handleInputAlergi}
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Makanan
                </label>
                <input
                  type="text"
                  name="makanan"
                  id="makanan"
                  onChange={handleInputAlergi}
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Lainnya
                </label>
                <input
                  type="text"
                  name="lainnya"
                  id="lainnya"
                  onChange={handleInputAlergi}
                  placeholder="Ada / Tidak Ada"
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
              </div>
              <br />
              <br />
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Lingkar Perut <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="lingkar-perut"
                  type="text"
                  name="lingkar_perut"
                  id="lingkar_perut"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-5 text-sm text-tint7">
                  Cm
                </span>
              </div>
              {errors.lingkar_perut && <p className="text-[#D66A63]">{errors.lingkar_perut}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Detak Nadi <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="detak-nadi"
                  type="text"
                  name="detak_nadi"
                  id="detak_nadi"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-4 text-sm text-tint7">
                  /Menit
                </span>
              </div>
              {errors.detak_nadi && <p className="text-[#D66A63]">{errors.detak_nadi}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Nafas <span className="text-[#D66A63]"> *</span>
                </label>
                <input
                  data-testid="nafas"
                  type="text"
                  name="nafas"
                  id="nafas"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                  
                
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-4 text-sm text-tint7">
                  /Menit
                </span>
              </div>
              {errors.nafas && <p className="text-[#D66A63]">{errors.nafas}</p>}
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Saturasi 
                </label>
                <input
                  type="text"
                  name="saturasi"
                  id="saturasi"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-6 text-sm text-tint7">
                  %
                </span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4 relative">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Suhu 
                </label>
                <input
                  type="text"
                  name="suhu"
                  id="suhu"
                  onChange={handleInputTTV}
                  className="w-2/3 px-7 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                />
                <span className="absolute right-0 top-0 bottom-0 bg-shade4 rounded-r-2xl flex items-center px-6 text-sm text-tint7">
                  ℃
                </span>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Detak Jantung
                </label>
                <div className="w-2/3 flex flex-row gap-10 items-center">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="regular"
                      name="detak_jantung"
                      value="regular"
                      onChange={handleDetakJantung}
                    />
                    <label
                      htmlFor="regular"
                      className="text-white font-Poppins font-normal ml-4"
                    >
                      Regular
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="iregular"
                      name="detak_jantung"
                      value="iregular"
                    />
                    <label
                      htmlFor="iregular"
                      className="text-white font-Poppins font-normal ml-4"
                    >
                      Iregular
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="w-1/3 mb-1 text-l text-white font-Poppins font-semibold">
                  Triage <span className="text-[#D66A63]"> *</span>
                </label>
                <div className="w-2/3 flex flex-col gap-2  text-start justify-start items-start">
                  <div className="flex flex-row items-center justify-center text-center">
                    <input
                      type="radio"
                      id="gawat_darurat"
                      name="triage"
                      value="gawat_darurat"
                      onChange={handleTriage}
                      
                    />
                    <label
                      htmlFor="gawat_darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Gawat Darurat
                    </label>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                    <input
                      type="radio"
                      id="darurat"
                      name="triage"
                      value="darurat"
                      onChange={handleTriage}

                    />
                    <label
                      htmlFor="darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Darurat
                    </label>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                    <input
                      data-testid="tdk-gawat-darurat"
                      type="radio"
                      id="tdk_gawat_darurat"
                      name="triage"
                      value="tdk_gawat_darurat"
                      onChange={handleTriage}

                    />
                    <label
                      htmlFor="tdk_gawat_darurat"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Tidak Gawat Darurat
                    </label>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center">
                    <input
                      type="radio"
                      id="meninggal"
                      name="triage"
                      value="meninggal"
                      onChange={handleTriage}

                    />
                    <label
                      htmlFor="meninggal"
                      className=" text-white font-Poppins font-normal ml-4 "
                    >
                      Meninggal
                    </label>
                  </div>
                </div>
              </div>
              {errors.triage && <p className="text-[#D66A63]">{errors.triage}</p>}
            </div>
          </div>
          <div className=" bg-tint4 w-auto mb-7 rounded-2xl px-5 py-11">
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Psikososial Spiritual
              </label>
              <textarea
                name="psikososial_spirit"
                id="psikososial_spirit"
                className="w-2/3 px-4 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
                onChange={handleInputTTV}
              />
            </div>
            <div className="flex flex-row justify-between items-center mb-4">
              <label className="w-1/3 pl-4 mb-1 text-l text-white font-Poppins font-semibold">
                Keterangan
              </label>
              <textarea
                name="keterangan"
                id="keterangan"
                className="w-2/3 px-4 py-3.5 bg-gray-100 rounded-2xl border border-neutral-200 text-shade7"
                placeholder="Ada / Tidak Ada"
                onChange={handleInputTTV}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center text-white font-semibold border-none rounded-2xl h-12 px-10 py-3.5 bg-primary1 w-full"
              data-testid="simpan"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
      <AlertSuccess isvisible={showAlertSuccess} onClose={() => setShowAlertSuccess(false)} message="TTV Berhasil Ditambahkan"/> 
      <AlertFailed isvisible={showAlertFailed} onClose={() => setShowAlertFailed(false)} topMessage="TTV Gagal Ditambahkan" bottomMessage="Data tidak dapat ditambahkan karena terjadi kesalahan pada server."/>
    </div>
  );
}
