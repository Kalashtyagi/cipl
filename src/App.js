import React from "react";
import { Routes, Route } from "react-router-dom";
import AddCategory from "./pages/dashboard/category/AddCategory";
import JobCategories from "./pages/dashboard/category/JobCategories";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ErfGenForm from "./pages/dashboard/form/ErfGenForm";
import ListForm from "./pages/dashboard/form/ListForm";
import AddSkills from "./pages/dashboard/Skills/AddSkills";
import JobSkill from "./pages/dashboard/Skills/JobSkill";
import Login from "./pages/login/Login";
import Exam from "./pages/dashboard/exam/Exam";
import Team from "./pages/dashboard/team/Team";
import Qualification from "./pages/dashboard/qualification/Qualification";
import AddQualification from "./pages/dashboard/qualification/AddQualification";
import SubQualification from "./pages/dashboard/subqualification/SubQualification";
import AddSubQualification from "./pages/dashboard/subqualification/AddSubQualification";
import Department from "./pages/dashboard/department/Department";
import AddDepartment from "./pages/dashboard/department/AddDepartment";
import RolesAndPermission from "./pages/dashboard/setting/rolespermission/RolesAndPermission";
import AssignPermission from "./pages/dashboard/setting/rolespermission/AssignPermission";
import AddTeam from "./pages/dashboard/team/AddTeam";
import AddAssignee from "./pages/dashboard/form/AddAssignee";
import AddExam from "./pages/dashboard/exam/AddExam";
import ListAssignee from "./pages/dashboard/form/ListAssignee";
import Questions from "./pages/dashboard/questions/Questions";
import AddQuestion from "./pages/dashboard/questions/AddQuestion";
import JobApplication from "./pages/dashboard/jobapplication/JobApplication";
import FilterJobApplication from "./pages/dashboard/jobapplication/FilterJobApplication";
import AddExamAssignee from "./pages/dashboard/exam/AddAssignee";
import MyProfile from "./pages/dashboard/setting/myprofile/MyProfile";
import Interview from "./pages/interview/Interview";
import OnlineInterview from "./pages/interview/OnlineExam";
import InterviewSchedule from "./pages/dashboard/interviewschedule/InterviewSchedule";
import AddInterviewSchedule from "./pages/dashboard/interviewschedule/AddInterviewSchedule";
import Certification from "./pages/dashboard/certification/Certification";
import AddCertification from "./pages/dashboard/certification/AddCertification";
import ExamSubmitted from "./pages/interview/ExamSubmitted";
import Result from "./pages/dashboard/result/Result";
import CandidateStore from "./pages/dashboard/candidateStore/CandidateStore";
import NewErf from "./pages/dashboard/newerf/Index";
import ViewNewErf from "./pages/dashboard/newerf/ViewNewErf";
import ViewLeads from "./pages/dashboard/newerf/ViewLeads";
import Documentation from "./pages/documentation/Index";
import NewErfApproval from "./pages/erfApproval/NewErfApproval";
import Document from "./pages/document/Document";
import PCCUpload from "./pages/document/PCCUpload";
import AssignedEmployee from "./pages/dashboard/assignedEmployee/AssignedEmployee";
import SalaryVerification from "./pages/salary/SalaryVerification";
import AddSalary from "./pages/dashboard/salary/AddSalary";
import SalaryList from "./pages/dashboard/salary/SalaryList";
import OfferLetter from "./pages/offerletter/CreateOfferLetter";
import OfferLetters from "./pages/dashboard/offerletter/OfferLetters";
import OnBoard from "./pages/dashboard/onboard/OnBoard";
import Datacenter from "./pages/dashboard/datacenter/Datacenter";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import NotFound from "./pages/dashboard/notfound/NotFound";
import FilterExam from "./pages/dashboard/exam/FilterExam";
import Jd from "./pages/dashboard/jobdescription/JobDescription";
import AddJobDescription from "./pages/dashboard/jobdescription/AddJobDescription";
import Feedback from "./pages/dashboard/feedbackform/Feedback";
import AddFeedback from "./pages/dashboard/feedbackform/AddFeedback";
import AddNewOfferletter from "./pages/offerletter/AddNewOfferletter";
import SingleJd from "./pages/dashboard/jobdescription/SingalJd";
import UpdateJd from "./pages/dashboard/jobdescription/UpdateJd";
import SingleFeedback from "./pages/dashboard/feedbackform/SingleFeedback";
import Offerletter from "./pages/offerletter/Offerletter";
import SingleOfferLetter from "./pages/offerletter/SingleOfferLetter";
import UpdateOfferletter from "./pages/offerletter/UpdateOfferletter";
import SendUpdateOfferletter from "./pages/offerletter/SendUpdateOfferLetter";

import RatingFeedback from "./pages/dashboard/ratingfeedback/index";
import RatingFeedbackTwo from "./pages/dashboard/ratingfeedbacktwo/index";
import Sendoffer from "./pages/editsendoffer/Sendoffer";
import SendOfferLetter from "./pages/dashboard/sendofferletter/offerletter";
import EditViewLeads from "./pages/dashboard/newerf/EditViewLeads";

function App() {
  return (
    <div className=" font-roboto text-[14px]">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path={"/"} element={<Login />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/erfapproval/:id"} element={<NewErfApproval />} />
        <Route path={"/interview/:id"} element={<Interview />} />
        <Route path={"/ratingfeedback/:id"} element={<RatingFeedback />} />
        <Route
          path={"/ratingfeedbacktwo/:id"}
          element={<RatingFeedbackTwo />}
        />

        <Route
          path={"/salaryverification/:id"}
          element={<SalaryVerification />}
        />
        <Route path={"/onlineinterview"} element={<OnlineInterview />} />
        <Route path={"/examsubmitted"} element={<ExamSubmitted />} />
        <Route path={"/documentation"} element={<Documentation />} />
        {/* <Route path={"/newerfapproval"} element={<NewErfApproval/>}/> */}
        <Route path={"/forgotpassword"} element={<ForgotPassword />} />
        <Route path={"/resetPassword/:id"} element={<ResetPassword />} />
        <Route path={"/documentsupload/:id"} element={<Document />} />
        <Route path={"/pccupload/:id"} element={<PCCUpload />} />
        <Route path={"/job-offer/:id"} element={<OfferLetter />} />

        {/* Admin Route */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Dashboard />} />
          <Route path="jobskill" element={<JobSkill />} />
          <Route path="addskill" element={<AddSkills />} />
          <Route path="jobcategory" element={<JobCategories />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="erfgenform" element={<ErfGenForm />} />
          <Route path="erflist" element={<ListForm />} />
          <Route path="exam" element={<Exam />} />
          <Route path="addexamassignee" element={<AddExamAssignee />} />
          <Route path="questions" element={<Questions />} />
          <Route path="addquestion" element={<AddQuestion />} />
          <Route path="jobapplication" element={<JobApplication />} />
          <Route
            path="filterjobapplication"
            element={<FilterJobApplication />}
          />
          {/* <Route path="exam" element={</>} /> */}
          <Route path="addexam" element={<AddExam />} />
          <Route path="team" element={<Team />} />
          <Route path="qualification" element={<Qualification />} />
          <Route path="addqualification" element={<AddQualification />} />
          <Route path="subqualification" element={<SubQualification />} />
          <Route path="addsubqualification" element={<AddSubQualification />} />
          <Route path="department" element={<Department />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="addassignee" element={<AddAssignee />} />
          <Route path="rolesandpermission" element={<RolesAndPermission />} />
          <Route path="assignpermission" element={<AssignPermission />} />
          <Route path="addteam" element={<AddTeam />} />
          <Route path="listassignee" element={<ListAssignee />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="interviewschedule" element={<InterviewSchedule />} />
          <Route
            path="addinterviewschedule"
            element={<AddInterviewSchedule />}
          />
          <Route path="certification" element={<Certification />} />
          <Route path="addcertification" element={<AddCertification />} />
          <Route path="candidatestore" element={<CandidateStore />} />
          <Route path="addsalary" element={<AddSalary />} />
          <Route path="salary" element={<SalaryList />} />
          <Route path="newerf" element={<NewErf />} />
          <Route path="result" element={<Result />} />
          <Route path="viewnewerf" element={<ViewNewErf />} />
          <Route path="viewleads" element={<ViewLeads />} />
          <Route path="editviewleads" element={<EditViewLeads />} />

          <Route path="assignedemployee" element={<AssignedEmployee />} />
          <Route path="offerletters" element={<OfferLetters />} />
          <Route path="onboard" element={<OnBoard />} />
          <Route path="datacenter" element={<Datacenter />} />
          <Route path="examassigneelists" element={<FilterExam />} />
          <Route path="jd" element={<Jd />} />
          <Route path="jd/:id" element={<SingleJd />} />
          <Route path="updatejd/:id" element={<UpdateJd />} />
          <Route path="AddJobDescription" element={<AddJobDescription />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="feedback/:id" element={<SingleFeedback />} />
          <Route path="Addfeedback" element={<AddFeedback />} />
          <Route path="Addnewofferletter" element={<AddNewOfferletter />} />
          <Route path="offerletter" element={<Offerletter />} />
          <Route
            path="offerletters/offerletter/:id"
            element={<SingleOfferLetter />}
          />

          <Route
            path="offerletters/SendOfferLetter/:id"
            element={<SendOfferLetter />}
          />

          <Route path="updateofferletter/:id" element={<UpdateOfferletter />} />
          <Route
            path="sendupdateofferletter/:id"
            element={<SendUpdateOfferletter />}
          />

          <Route path="sendoffer" element={<Sendoffer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
