import { PaymentSession } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import clsx from "clsx"
import React from "react"
// import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  setSelected: () => void
  disabled?: boolean
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  paypal: {
    title: "PayPal",
    description:
      "Safe payment  online,credit card needed. PayPal account  is not necessary.",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  setSelected,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(
        "pl-2 flex flex-col gap-y-4 border-b border-gray-200 last:border-b-0",
        {
          " bg-gradient-radial from-[#e61a5e] to-[#5e1ae6]": selected,
        }
      )}
    >
      <button
        className={"grid grid-cols-[12px_1fr] gap-x-4 pt-4 px-8"}
        onClick={setSelected}
        disabled={disabled}
      >
        <Radio checked={selected} />
        <div className="flex flex-col text-left">
          <h3
            className={clsx("text-xl leading-none ", {
              "text-white": selected,
              "text-gray-900": !selected,
            })}
          >
            {PaymentInfoMap[paymentSession.provider_id].title}
          </h3>
          <span
            className={clsx("text-base mt-1", {
              "text-white": selected,
              "text-gray-700": !selected,
            })}
          >
            {PaymentInfoMap[paymentSession.provider_id].description}
          </span>
          {selected && (
            <div className="w-full mt-4">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  switch (paymentSession.provider_id) {
    // case "stripe":
    //   return (
    //     <div className="pt-8 pr-7">
    //       <PaymentStripe />
    //     </div>
    //   )
    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
