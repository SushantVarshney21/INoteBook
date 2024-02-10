import React from "react";
import img from "../image/imgabout.jpg";

function About() {
  return (
    <div>
      <h1 className="text-center mt-5 ">About US</h1>
      <div className="container  d-flex mt-5 " id="about">
        <img src={img} alt="About Us Image" id="img"/>
        <div className="container "  id="about-con">
          <h3>Know's About INoteBook</h3>
          <p className="mt-3">
            One way to do this is by explaining who you are and what your
            company is about. The easiest and most effective way to achieve this
            is with an About Us page.Youve probably stumbled on a bunch of About
            Us pages, but how do you know which ones are most effective?In this
            post, well share some of the most effective About Us pages for
            specific niches and explain why they are so impactful.Before we dive
            in, lets look at an overview of About Us pages and dissect a
            commonly-used template for the specific niches and explain why they
            are so impactful.Before we dive in, lets look at an overview of
            About Us pages and dissect a commonly-used template
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
