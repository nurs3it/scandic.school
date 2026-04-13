'use client'

import teacherNoImg from "../../public/teacher-no-img.json";
import Lottie from "lottie-react";

const TeacherNoImg = () => {
  return <Lottie
    animationData={teacherNoImg}
    loop={true}
    className="w-64 h-64 mx-auto"
  />
}

export {TeacherNoImg}