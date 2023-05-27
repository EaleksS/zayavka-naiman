import { FC, useRef, useState } from "react";
import styles from "./Application.module.scss";
import { TbMessageCircle2Filled } from "react-icons/tb";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import InputMask from "react-input-mask";

const Application: FC = (): JSX.Element => {
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");

  const form = useRef<any>(null);

  const handleClick = () => {
    if (typeof captcha !== "string") return;

    if (!value && value.includes("_")) return;

    emailjs
      .sendForm(
        "service_uolwggt",
        "template_yjrfoju",
        form.current,
        "mKOADVKQy493uyxFV"
      )
      .then(
        () => {
          document.location.href = "https://ak-naiman.ru/thankyou";
        },
        (error) => {
          alert(`Ошибка:"${error}", попробуйте позже`);
        }
      );
  };

  return (
    <div className={styles.container}>
      <h1>
        Оставьте заявку на получение планировок, фотографий и спецпредложений в
        <br />
        <span> NAIMAN</span>
      </h1>
      <p>Напишите Ваш номер телефона, к которому привязан WhatsApp</p>
      <form ref={form} onSubmit={(e) => e.preventDefault()}>
        <h2>НОМЕР ТЕЛЕФОНА C WHATSAPP</h2>
        <InputMask
          mask="+7 (999) 999-99-99"
          name="message"
          defaultValue={9}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></InputMask>
        <div className={styles.captcha}>
          <ReCAPTCHA
            sitekey="6LcRaPolAAAAANy9LLcMs7-1A2RHHFM32KMPI7fc"
            onChange={(value) => setCaptcha(value)}
          />
        </div>
        <button
          className={`${
            typeof captcha === "string" &&
            value &&
            !value.includes("_") &&
            styles.active
          }`}
          onClick={handleClick}
          value="Send"
        >
          <TbMessageCircle2Filled /> Отправить на WhatsApp
        </button>
      </form>
    </div>
  );
};

export default Application;
