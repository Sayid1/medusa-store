import FooterCTA from "@modules/layout/components/footer-cta"
import FooterNav from "@modules/layout/components/footer-nav"
import MedusaCTA from "@modules/layout/components/medusa-cta"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-radial from-[#e61a5e] to-[#5e1ae6] text-white">
      {/* <FooterCTA /> */}
      <FooterNav />
      {/* <MedusaCTA /> */}
    </footer>
  )
}

export default Footer
