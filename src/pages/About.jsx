import React from "react";
import ShopHeroSection from "../components/HeroForSections";
import CategoryImage from "../assets/Images/ShopCategory.jpg";
import {
  FaBullseye,
  FaLightbulb,
  FaHandsHelping,
  FaUsers,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const StatCard = ({ icon, title, text }) => (
  <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl !p-6 flex flex-col gap-4 items-start">
    <div className="text-red-500 text-2xl">{icon}</div>
    <h4 className="text-white text-xl font-semibold">{title}</h4>
    <p className="text-white/60 text-sm">{text}</p>
  </div>
);

const TeamMember = ({ img, name, role }) => (
  <div className="flex flex-col items-center gap-3">
    <img
      src={img}
      alt={name}
      className="w-32 h-32 object-cover rounded-full border-4 border-white/10"
    />
    <div className="text-center">
      <h5 className="text-white font-semibold">{name}</h5>
      <p className="text-white/60 text-sm">{role}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="w-full">
      <ShopHeroSection SecondLink={"about"} />

      <main className="max-w-6xl !mx-auto !px-4 md:!px-6 !py-12">
        {/* Intro */}
        <section className="bg-[#0b0b0b] rounded-3xl !p-8 md:!p-12 shadow-xl">
          <div className="md:flex md:items-center md:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                About Us
              </h2>
              <p className="text-white/70 mt-4 text-lg">
                We craft delicious moments — fresh ingredients, authentic
                recipes and a team passionate about great food. Our mission is
                to deliver memorable meals that bring people together.
              </p>

              <div className="!mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to={"/contact"}
                  className="inline-flex text-center items-center gap-3 bg-red-600 hover:bg-red-700 text-white !px-5 !py-3 rounded-xl transition"
                >
                  <FaPhoneAlt />
                  Contact Us
                </Link>
                <Link
                  to={"/shop"}
                  className="inline-flex items-center justify-center gap-3 border border-white/20 text-white !px-5 !py-3 rounded-xl hover:bg-white/5 transition"
                >
                  Explore Menu
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 !mt-8 md:mt-0 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-white/5">
                <img
                  src={CategoryImage}
                  alt="About visual"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="!mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<FaBullseye />}
            title="Our Mission"
            text="Deliver high-quality food fast while treating every customer like family."
          />
          <StatCard
            icon={<FaLightbulb />}
            title="Our Vision"
            text="Be the go-to local choice for real, crafted flavors and warm experiences."
          />
          <StatCard
            icon={<FaHandsHelping />}
            title="Our Promise"
            text="Sustainability, fresh sourcing and consistent taste in every order."
          />
        </section>

        {/* Team */}
        {/* <section className="!mt-12">
          <h3 className="text-3xl font-bold text-white !mb-6">Meet the Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            <TeamMember
              img={CategoryImage}
              name="Amina Khaled"
              role="Founder"
            />
            <TeamMember
              img={CategoryImage}
              name="Omar Salah"
              role="Head Chef"
            />
            <TeamMember
              img={CategoryImage}
              name="Laila Ahmed"
              role="Operations"
            />
            <TeamMember
              img={CategoryImage}
              name="Youssef N."
              role="Marketing"
            />
          </div>
        </section> */}

        {/* Values / CTA */}
        <section className="!mt-12 bg-[#0b0b0b] rounded-2xl !p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold text-white">
              Values that guide us
            </h4>
            <p className="text-white/70 !mt-3 max-w-xl">
              Respect, quality and community are at the core of everything we
              do. We build trust through transparency and consistently good
              food.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to={"/contact"}
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white !px-6 !py-3 rounded-xl transition"
            >
              Get in Touch
            </Link>
            <Link
              to={"/shop"}
              className="inline-flex items-center gap-3 border border-white/20 text-white !px-6 !py-3 rounded-xl hover:bg-white/5 transition"
            >
              Order Now
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <div className="!mt-10 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Your Restaurant · Fresh ingredients ·
          Fast delivery
        </div>
      </main>
    </div>
  );
};

export default About;
