import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center my-12 md:my-24">
      <h1 className={`${styles.heroText} text-3xl md:text-5xl text-center text-purple-800 font-semibold`}>We have food at home!</h1>
      <p className=""></p>
    </div>
  );
};

export default Hero;