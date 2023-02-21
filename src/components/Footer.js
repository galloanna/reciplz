const Footer = () => {
  const copyrightFooter = `
  Copyright © ${new Date().getFullYear()} Anna Gallo
`;

  return (
    <footer className="bg-purple-700 text-white absolute bottom-0 w-full flex items-center justify-center p-5">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg">{copyrightFooter}</p>
        <p className="text-sm">Made with love, React, and Netlify ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
