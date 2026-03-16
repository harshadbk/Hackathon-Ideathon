const mockRequests = [
  {
    id: 'demo-1',
    title: 'School Development Grant Records (FY 2023-24)',
    department: 'Department of School Education',
    pio: 'PIO, District Education Office',
    createdAt: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'awaiting_response',
    subject: 'School Development Grant Records (FY 2023-24)',
    aiDraft: `Request for certified copies of all sanctioned grants and utilization certificates for School XYZ for FY 2023-24, including dates, amounts and sanction orders.`,
    timeline: [
      { at: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 16 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' }
    ]
  },
  {
    id: 'demo-2',
    title: 'Vendor Selection for Municipal Water Contract',
    department: 'Municipal Water Department',
    pio: 'PIO, Municipal Corporation',
    createdAt: new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'responded',
    subject: 'Vendor Selection for Municipal Water Contract',
    respondedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    aiDraft: `Please share the bid evaluation report, final contract and financial terms for water supply contract tender ref. WTR/2024/01.`,
    pioResponse: `Dear Applicant,\n\nYour RTI application dated ${new Date(Date.now() - 40 * 24 * 3600 * 1000).toLocaleDateString()} has been processed.\n\nInformation provided:\n\n1. Bid Evaluation Report: Attached as Document A\n2. Final Contract Terms: Attached as Document B  \n3. Financial Summary: Attached as Document C\n\nPlease note: Some portions have been redacted under Section 8(1)(j) of the RTI Act 2005 as they relate to third-party commercial information.\n\nFor any clarification, you may contact our office within 15 days.\n\nRegards,\nPublic Information Officer\nMunicipal Corporation`,
    timeline: [
      { at: new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 38 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' },
      { at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), text: 'Response Submitted by PIO', actor: 'PIO' }
    ]
  },
  {
    id: 'demo-3',
    title: 'Annual Audit Reports 2024-25',
    department: 'State Finance Department',
    pio: 'PIO, State Treasury',
    createdAt: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'rejected',
    subject: 'Annual Audit Reports 2024-25',
    respondedAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    aiDraft: `Request for complete audit reports and financial statements for all departments for FY 2024-25.`,
    pioResponse: `Dear Applicant,\n\nYour RTI application has been examined. We regret to inform you that the requested information cannot be provided for the following reasons:\n\n1. The audit reports for FY 2024-25 are still under internal review and have not been finalized.\n2. As per Section 8(1)(g) of the RTI Act, information that would endanger the security of the nation cannot be disclosed.\n3. Section 12(c) applies as the information would adversely affect the financial interests of the government.\n\nYou may appeal this decision to the First Appellate Authority within 30 days from the date of this letter.\n\nRegards,\nPublic Information Officer\nState Treasury`,
    timeline: [
      { at: new Date(Date.now() - 45 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 43 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' },
      { at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(), text: 'Response Submitted by PIO (Rejected)', actor: 'PIO' }
    ]
  },
  {
    id: 'demo-4',
    title: 'Public Land Allotment Records - Zone A',
    department: 'Revenue & Land Records Department',
    pio: 'PIO, District Revenue Office',
    createdAt: new Date(Date.now() - 22 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'awaiting_response',
    subject: 'Public Land Allotment Records - Zone A',
    aiDraft: `Copies of all public land allotment records for Zone A from 2022 to present, including beneficiary details, allotment dates, and plot allocations.`,
    timeline: [
      { at: new Date(Date.now() - 22 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 20 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' }
    ]
  },
  {
    id: 'demo-5',
    title: 'Staff Leave and Attendance Records',
    department: 'District Administration',
    pio: 'PIO, District Collector Office',
    createdAt: new Date(Date.now() - 35 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'responded',
    subject: 'Staff Leave and Attendance Records',
    respondedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    aiDraft: `Details of all leave applications and attendance records for all administrative staff for the year 2024.`,
    pioResponse: `Dear Applicant,\n\nThank you for your RTI request.\n\nThe requested information is partially available:\n\n✓ Attendance summary statistics (by category) - Provided\n✓ Leave policy details - Provided\n\n✗ Individual staff leave details - Cannot be provided (Personal Information)\n✗ Individual attendance records - Cannot be provided (Personal Information)\n\nAs per Section 8(1)(j) of the RTI Act, personal information of government staff cannot be disclosed unless there is a larger public interest.\n\nYou have the right to appeal if you disagree with this decision.\n\nBest Regards,\nPublic Information Officer\nDistrict Administration`,
    timeline: [
      { at: new Date(Date.now() - 35 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 33 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' },
      { at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), text: 'Response Submitted by PIO', actor: 'PIO' }
    ]
  },
  {
    id: 'demo-6',
    title: 'Building Permit Applications and Approvals',
    department: 'Municipal Corporation - Building Dept',
    pio: 'PIO, Municipal Building Department',
    createdAt: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'awaiting_response',
    subject: 'Building Permit Applications and Approvals',
    aiDraft: `List of all building permit applications received and approved for residential buildings in the municipal area for the period 2024 onwards, including applicant details and approval dates.`,
    timeline: [
      { at: new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' },
      { at: new Date(Date.now() - 25 * 24 * 3600 * 1000).toISOString(), text: 'Acknowledged by Department', actor: 'PIO' }
    ]
  }
]

export default mockRequests
