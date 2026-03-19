const mockRequests = [
  {
    id: 'demo-1',
    title: 'School Development Grant Records (FY 2023-24)',
    department: 'Department of School Education',
    pio: 'PIO, District Education Office',
    createdAt: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'awaiting_response',
    aiDraft: `Request for certified copies of all sanctioned grants and utilization certificates for School XYZ for FY 2023-24, including dates, amounts and sanction orders.`,
    timeline: [
      { at: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' }
    ]
  },
  {
    id: 'demo-2',
    title: 'Vendor Selection for Municipal Water Contract',
    department: 'Municipal Water Department',
    pio: 'PIO, Municipal Corporation',
    createdAt: new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString(),
    deadlineDays: 30,
    status: 'awaiting_response',
    aiDraft: `Please share the bid evaluation report, final contract and financial terms for water supply contract tender ref. WTR/2024/01.`,
    timeline: [
      { at: new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString(), text: 'RTI Filed', actor: 'citizen' }
    ]
  }
]

export default mockRequests
