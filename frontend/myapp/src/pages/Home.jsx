import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Welcome Section */}
      <h1 style={{ fontSize: "36px", color: "#2c3e50", marginBottom: "20px" }}>
        Welcome to MyVote
      </h1>
      <p style={{ fontSize: "18px", color: "#34495e", marginBottom: "30px" }}>
        Empower your voice, shape the future, and participate in democracy like
        never before. MyVote makes the voting process secure, efficient, and
        accessible to all.
      </p>

      {/* Why Voting Section */}
      <div style={{ margin: "30px 0" }}>
        <h2
          style={{ fontSize: "28px", color: "#ffffff", marginBottom: "10px" }}
        >
          Why Should You Vote?
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "black",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Voting is the foundation of democracy. It allows citizens to have a
          say in shaping policies and electing leaders. Every vote counts, and
          it’s our responsibility to ensure fair representation and
          accountability in government.
        </p>
      </div>

      {/* How It Works Section */}
      <div style={{ marginTop: "50px", textAlign: "left" }}>
        <h2
          style={{
            fontSize: "28px",
            color: "#2980b9",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          How Does It Work?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            className="bg-transparent"
            style={{ maxWidth: "250px", textAlign: "center" }}
          >
            <img
              className="bg-transparent"
              src="https://img.lovepik.com/element/45009/8997.png_860.png"
              alt="Step 1"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h4 style={{ marginTop: "10px" }}>1. Register or Login</h4>
            <p style={{ color: "#ffffff" }}>
              Create an account or log in using your unique voter credentials.
            </p>
          </div>
          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <img
              src="https://th-i.thgim.com/public/incoming/vt3yw/article67648559.ece/alternates/FREE_1200/iStock-1269463469.jpg"
              alt="Step 2"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h4 style={{ marginTop: "10px" }}>2. View Elections</h4>
            <p style={{ color: "#ffffff" }}>
              Explore ongoing and upcoming elections you’re eligible to
              participate in.
            </p>
          </div>
          <div style={{ maxWidth: "250px", textAlign: "center" }}>
            <img
              src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-04/06/full/1617676272-2577.jpg?im=FeatureCrop,size=(826,465)"
              alt="Step 3"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h4 style={{ marginTop: "10px" }}>3. Cast Your Vote</h4>
            <p style={{ color: "#ffffff" }}>
              Make your choice, confirm your vote, and contribute to democracy.
            </p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div
        style={{
          margin: "50px 0",
          padding: "20px",
          background: "transparent",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{ fontSize: "28px", color: "#27ae60", marginBottom: "10px" }}
        >
          Your Security Is Our Priority
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "black",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          MyVote uses state-of-the-art encryption technologies to ensure that
          every vote remains confidential and secure. Our transparent and
          tamper-proof system builds trust and confidence among voters.
        </p>
      </div>

      {/* Call to Action */}
      <div style={{ marginTop: "40px" }}>
        <Link
          to="/login"
          style={{
            display: "inline-block",
            padding: "15px 30px",
            fontSize: "18px",
            color: "#ffffff",
            background: "#2980b9",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
