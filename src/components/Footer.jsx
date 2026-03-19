import './Footer.css'

export default function Footer() {
  return (
    <footer className="gov-footer">
      <div className="gov-footer-strip"></div>
      <div className="gov-footer-inner">
        <div className="gov-footer-brand">
          <div className="gov-footer-emblem">☸</div>
          <div>
            <div className="gov-footer-title">RTI Management Portal</div>
            <div className="gov-footer-sub">Ministry of Personnel, Public Grievances & Pensions</div>
          </div>
        </div>
        <div className="gov-footer-links">
          <a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer">RTI Portal</a>
          <a href="https://cic.gov.in/" target="_blank" rel="noopener noreferrer">CIC</a>
          <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">India.gov.in</a>
          <a href="#">Accessibility</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="gov-footer-copy">
          © {new Date().getFullYear()} Government of India — Right to Information Act, 2005 | Last Updated: 2026
        </div>
      </div>
    </footer>
  )
}
