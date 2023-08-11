import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="https://play-lh.googleusercontent.com/uV64qQXi3CQLYR2qDjmcWsxDJi9-l_CpcNs7HY0qf7Zz7eRRU26sEM2dvEjWW8LyHimf"
								alt="wells-fargo"
								className="work-image"
							/>
							<div className="work-title">Wells Fargo Bank</div>
							<div className="work-subtitle">
								Bank Teller
							</div>
							<div className="work-duration">2022 - 2023</div>
						</div>
						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Eastern_New_Mexico_University_seal.svg/1200px-Eastern_New_Mexico_University_seal.svg.png"
								alt="enmu"
								className="work-image"
							/>
							<div className="work-title">Eastern New Mexico University</div>
							<div className="work-subtitle">
								IT Support Specialist
							</div>
							<div className="work-duration">2021 - 2022</div>
						</div>
						<div className="work">
							<img
								src="https://github.com/smithd36/Python-SQLite-CLI-DBMS/assets/90289165/ddd3a1ff-2baa-49ea-9953-c882fcaf0144"
								alt="cmmcgc"
								className="work-image"
							/>
							<div className="work-title">Corona Mini Mart</div>
							<div className="work-subtitle">
								Digital Marketing Manager
							</div>
							<div className="work-duration">2020 - 2022</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
