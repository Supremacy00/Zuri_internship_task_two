import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import useFetch from "../hooks/UseFetch";

const Footer = () => {
  const socialMediaIcons = [
    { icon: <FacebookOutlinedIcon />, id: 1 },
    { icon: <InstagramIcon />, id: 2 },
    { icon: <TwitterIcon />, id: 3 },
    { icon: <YouTubeIcon />, id: 4 },
  ];

  const footerLinks = [
    { label: "Conditions of Use", id: 1 },
    { label: "Privacy Policy", id: 2 },
    { label: "Cookie Policy", id: 3 },
  ];

  const { isLoading } = useFetch();
  return (
    !isLoading && (
      <footer className="mt-24 mb-12 font-roboto md:mt-44 md:mb-24">
        <div>
          <div className="flex justify-center items-center gap-8 md:gap-10">
            {socialMediaIcons.map((item) => (
              <div key={item.id}>{item.icon}</div>
            ))}
          </div>
          <div className="flex justify-center items-center text-[15px] mt-6 gap-3  sm:gap-6  sm:mt-10 sm:text-[17px]">
            {footerLinks.map((item) => (
              <div key={item.id}>
                <div>{item.label}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-center text-gray-500 text-[14px] mt-6 sm:mt10  sm:text-[15px]">
              &copy; 2023 MovieBox by Musa Abdulmuqaddas
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
