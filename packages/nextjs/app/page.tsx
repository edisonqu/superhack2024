"use client";

import { useState } from "react";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    hackathonName: "",
    projectName: "",
    prizeName: "",
    prizeAmount: "",
    location: "",
    teamMembers: "",
  });
  const [network, setNetwork] = useState("Base");
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);

  const handleImport = () => {
    // Implement logic to fetch project data from URL and populate form
    // For now, we'll just populate the form with sample data
    setFormData({
      hackathonName: "LFGHO",
      projectName: "Face2GHO",
      prizeName: "Best DeFi Project",
      prizeAmount: "$2000 USDC",
      location: "Virtual",
      teamMembers: "William Wang, Edison Qu",
    });
    alert(`Hackathon Project imported from ${url}!`);
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMintNFT = () => {
    // Implement NFT minting logic here
    alert("Minting NFT on " + network + " with data: " + JSON.stringify(formData));
  };

  const handleVerify = async (proof: ISuccessResult) => {
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Verification failed");
      }

      const data = await res.json();
      console.log("Verification response:", data);
    } catch (error) {
      console.error("Verification error:", error);
      throw new Error("Verification failed"); // IDKit will display this error message
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
    // window.location.href = "/success";
    setWorldcoinVerified(true);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        {connectedAddress ?  (
            <div className="px-5 w-full max-w-2xl">
              <h1 className="text-center mb-8">
                <span className="block text-4xl font-bold">Hackathon NFT Minter</span>
              </h1>

              <div className="mb-6">
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Enter project URL"
                  className="input input-bordered w-full"
                />
                <button onClick={handleImport} className="btn btn-primary mt-2 w-full">
                  Import Project
                </button>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hackathon Name</span>
                </label>
                <input
                  type="text"
                  name="hackathonName"
                  value={formData.hackathonName}
                  onChange={handleInputChange}
                  placeholder="Enter hackathon name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Project Name</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Prize Name</span>
                </label>
                <input
                  type="text"
                  name="prizeName"
                  value={formData.prizeName}
                  onChange={handleInputChange}
                  placeholder="Enter prize name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Prize Amount</span>
                </label>
                <input
                  type="text"
                  name="prizeAmount"
                  value={formData.prizeAmount}
                  onChange={handleInputChange}
                  placeholder="Enter prize amount"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter hackathon location"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Team Members</span>
                </label>
                <input
                  type="text"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleInputChange}
                  placeholder="Enter team members"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Choose Network</span>
                </label>
                <select
                  value={network}
                  onChange={e => setNetwork(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="Base">Base</option>
                  <option value="Optimism">Optimism</option>
                </select>
              </div>

              <button onClick={handleMintNFT} className="btn btn-primary mt-6 w-full">
                Mint NFT
              </button>
            </div>
          )
         : (
          <div className="px-5 w-full max-w-2xl">
            <h1 className="text-center mb-8">
              <span className="block text-4xl font-bold">Please connect your wallet to get started!</span>
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
