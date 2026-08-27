const teamMembers = [
  {
    id: 1,
    name: "Jerome Bell",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Kristin Watson",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Esther Howard",
    role: "Technical Lead",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Jacob Jones",
    role: "Chief Service Officer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format",
  },
];

const AboutLeaderShip = () => {
  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 py-20 lg:py-28">
      {/* Heading */}
      <div className="text-center mb-12 lg:mb-16">
        <h2
          className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#1a73e8] leading-[1.2]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          The Leadership Team
        </h2>

        <p
          className="text-[15px] sm:text-[16px] text-[#6b747c] mt-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          The experts driving the elite experience.
        </p>
      </div>

      {/* Team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {teamMembers.map((member) => (
          <article
            key={member.id}
            className="rounded-[12px] border border-[#edf1f5] bg-white shadow-[0px_2px_14px_rgba(0,0,0,0.025)] px-6 py-7 text-center hover:shadow-md transition-shadow"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-[72px] h-[72px] object-cover rounded-[10px] mx-auto"
            />

            <h3
              className="mt-5 text-[18px] font-bold text-[#252b30]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {member.name}
            </h3>

            <p
              className="mt-1 text-[14px] text-[#616b73]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {member.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutLeaderShip;
