export type BranchStatus = "active" | "inactive";

export interface AcademyBasicInfo {
  academyName: string;
  representativeName: string;
  representativePhone: string;
  businessNumber: string;
  address: string;
}

export interface AcademyOverview {
  totalStudents: number;
  totalEnrolled: number;
  usageRate: number;
}

export interface AcademyBranch {
  id: number;
  branchName: string;
  manager: string;
  status: BranchStatus;
}

export interface AcademyInfoResponse {
  basicInfo: AcademyBasicInfo;
  overview: AcademyOverview;
  branches: AcademyBranch[];
}
