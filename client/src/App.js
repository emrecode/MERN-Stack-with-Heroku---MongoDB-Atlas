import {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [projes, setProjes] = useState([
    {
      projeadi: '',
      adisoyadi: '',
      uniadi: '',
      yil:''
    }
  ])

  const [proje, setProje] = useState(
    {
      projeadi: '',
      adisoyadi: '',
      uniadi: '',
      yil:''
    }
  )

  useEffect(() => {
    fetch('/projes').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setProjes(jsonRes))
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setProje(prevInput => {
      return(
        {
          ...prevInput,
          [name]: value
        }
      )
    })
  }

  function ProjeEkle(e) {
    e.preventDefault();
    const yeniProje = {
      projeadi: proje.projeadi,
      adisoyadi: proje.adisoyadi,
      uniadi: proje.uniadi,
      yil: proje.yil
    }

    axios.post('/yeniproje', yeniProje); 


  }

  function projeSil(id) {
    axios.delete('/sil/' + id);
    alert("proje silindi");
  }

  return (
    <div className="App">
      <h3>Bitirme Projeleri</h3>
      <form>
        <input onChange={handleChange} name="projeadi" value={proje.projeadi} placeholder="Proje Adı" ></input>
        <input onChange={handleChange} name="adisoyadi" value={proje.adisoyadi}placeholder="Adı Soyadı" ></input>
        <input onChange={handleChange} name="uniadi" value={proje.uniadi} placeholder="Üniversite" ></input>
        <input onChange={handleChange} name="yil" value={proje.yil} placeholder="Yıl" ></input>

        <button  onClick={ProjeEkle}>Proje Ekle</button>
      </form>

      

      {projes.map(proje => {
        return (
          
          <ul>
            <h5>{proje.projeadi} - {proje.adisoyadi} - {proje.uniadi} - {proje.yil} <button onClick={() => projeSil(proje._id)}>Sil</button></h5>
          </ul>
        ) 
      })}
    </div>
  );
}

export default App;

