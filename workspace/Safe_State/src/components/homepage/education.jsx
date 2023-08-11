import React from "react";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Education = () => {
	return (
		<div className="works">
			<Card
				icon={faBook}
				title="Education"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Eastern_New_Mexico_University_seal.svg/1200px-Eastern_New_Mexico_University_seal.svg.png"
								alt="enmu"
								className="work-image"
							/>
							<div className="work-title">Eastern New Mexico University</div>
							<div className="work-subtitle">
								Bachelor's of Computer Science
                            </div>
							<div className="work-duration">12/2019 - 12/2023</div>
						</div>
						<div className="work">
							<img
								src="https://images.credly.com/images/63482325-a0d6-4f64-ae75-f5f33922c7d0/CompTIA_A_2Bce.png"
								alt="codeacademy"
								className="work-image"
							/>
							<div className="work-title">CompTIA Certification</div>
							<div className="work-subtitle">
								A+ Certification -> Pursuing Network+
							</div>
							<div className="work-duration">2023</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Education;
