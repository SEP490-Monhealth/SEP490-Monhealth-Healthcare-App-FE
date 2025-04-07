import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from "@/components/globals/atoms/stepper"

const steps = [
  {
    step: 1,
    title: "Thông tin",
    description: "Nhập thông tin món ăn"
  },
  {
    step: 2,
    title: "Dinh dưỡng",
    description: "Nhập dinh dưỡng món ăn"
  }
]

function StepCreateFood() {
  return (
    <div className="space-y-8 text-center">
      <Stepper defaultValue={2}>
        {steps.map(({ step, title, description }) => (
          <StepperItem
            key={step}
            step={step}
            className="not-last:flex-1 max-md:items-start"
          >
            <StepperTrigger className="rounded max-md:flex-col">
              <StepperIndicator />
              <div className="text-center md:text-left">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription className="max-sm:hidden">
                  {description}
                </StepperDescription>
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
            )}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  )
}
export default StepCreateFood
