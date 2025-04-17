import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="bg-white h-[70px] w-screen flex justify-between items-center pl-[30px] pr-[20px] md:px-[30px]">
        <img className="h-full" src="images/Pokemon-Logo-Clipart-edit-online (1).png" alt="Logo" />

        <div className="flex justify-between items-center gap-x-[28px] h-[63%]">
          <a className="anchorr a1" href="#">
            Docs
          </a>
          <a className="anchorr a2" href="#">
            About
          </a>
          <div className="h-full w-[45px] bg-[#FAC02E] flex justify-center items-center rounded-[8px] md:hidden">
            <i className="fa-solid fa-heart text-red-500 text-[20px]"></i>
          </div>

          <button className="hidden bg-[#FAC02E] h-[45px] w-[130px] rounded-[4px] text-[15px] font-black text-white tracking-[1.5px] cursor-pointer md:block">
            SUPPORT US
          </button>
        </div>
      </div>

      {/* <!-- Title Content  --> */}

      <div className="mt-[20px] px-[20px] flex flex-col justify-between items-center md:px-[10%]">
        <img src="images/d70128f665c0687a491a0bef962b4e72~2.png" alt="Title Image" />
        <p className="text-[#FAC02E] font-black mb-[30px] tracking-[1.5px] text-[5vw] md:text-[3vw]">
          POKEMON API
        </p>
      </div>
    </>
  );
};

export default Navbar;
