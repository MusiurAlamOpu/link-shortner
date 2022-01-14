import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [showConvertResult, setShowConvertResult] = useState(false);
  const [convertedLink, setConvertedLink] = useState("__no__link");

  const [formData, setFormData] = useState({ linkToShort: "" });
  const [errorMessage, setErrorMessage] = useState({ noError: "" });

  const resetStage = () => {
    setShowConvertResult(false);
    setConvertedLink("__no__link");
    setFormData({ linkToShort: "" });
    setErrorMessage({ noError: "" })
  }


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    resetStage();
    if (showConvertResult) document.getElementById("copyButton").innerText = "Copy";
    setFormData({ [name]: value })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(!formData.linkToShort.trim() && { noError: "Link is required!" });
  }

  useEffect(() => {

    //checking if there is no error in form validation
    if (Object.keys(errorMessage).length === 0) {
      setConvertedLink(false);

      //do whatever as form is validated
      console.log(formData);

      const convertToShorLink = () => {
        // before this statement we should convert the link to shortner
        setConvertedLink(formData.linkToShort);
        setShowConvertResult(true);
      }

      //while we are implementing core function we can remove setTimout()
      setTimeout(() => {
        convertToShorLink();
      }, 2000);

    } else {
      setConvertedLink("__no__link");
    }



  }, [errorMessage]);

  // no need to add formData as dependency cause this
  // useEffect will be updated respecting to errorMessage



  return (
    <div className={styles.container}>
      <Head>
        <title>Link shortner</title>
        <meta name="description" content="This is a Link Shortner which will help to Reduce link size" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-g" style={{ minHeight: "100vh", marginTop: "10vh" }}>
        <h1 className={styles.title}>
          Welcome to LINK<span>SHORTNER!</span>
        </h1>

        <p className={styles.description}>
          Get started by typing/pasting ---{' '}
          <span style={{ fontWeight: "600" }}>your link below</span>
        </p>


        {/* search box */}
        <div className={styles.searchBox}>
          <input name="linkToShort" type="text" placeholder='Paste your link here' onChange={handleOnChange} />
          <button onClick={handleOnSubmit}>Short</button>
          {
            errorMessage.noError && <p className={styles.errorStyle}>{errorMessage.noError}</p>
          }

        </div>


        {/* result section  */}
        {
          convertedLink === false && <div style={{ textAlign: "center", margin: "1rem" }}>Loading...</div>
        }
        {
          showConvertResult && convertedLink &&
          <div className={`container-g ${styles.result}`}>
            <h3>Here is short form of your link ✔ </h3>

            <div className={styles.linkBox}>
              {/* in this code tag you can use variable */}
              <p className={styles.linkP}>{formData.linkToShort}</p>


              <button id="copyButton" onClick={() => {
                //pass same variable like code tage in writeText(__)
                navigator.clipboard.writeText(formData.linkToShort);


                let copyButtonActions = document.getElementById("copyButton");
                // for better ux
                copyButtonActions.innerText = "Copied";
                copyButtonActions.style.backgroundColor = "#61e682";
                copyButtonActions.style.color = "white";

                setTimeout(() => {
                  copyButtonActions.innerText = "Copy";
                  copyButtonActions.style.backgroundColor = "#eee";
                  copyButtonActions.style.color = "gray";
                }, 1000);

              }}>Copy</button>

            </div>
          </div>
        }
      </div>



      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
