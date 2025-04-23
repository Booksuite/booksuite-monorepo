import { Check } from 'lucide-react'

export interface MealPlan {
    id: string
    title: string
    description: string
    pricePerDay: number
}

interface MealPlanSelectorProps {
    plans: MealPlan[]
    multiSelect?: boolean
    onChange: (selectedPlans: MealPlan[]) => void
    value?: MealPlan[]
}

export const MealPlanSelector: React.FC<MealPlanSelectorProps> = ({
    plans,
    multiSelect = false,
    onChange,
    value = [],
}) => {
    const handleSelect = (plan: MealPlan) => {
        if (!multiSelect) {
            onChange([plan])
            return
        }

        const isSelected = value.some((p) => p.id === plan.id)
        if (isSelected) {
            onChange(value.filter((p) => p.id !== plan.id))
        } else {
            onChange([...value, plan])
        }
    }

    const isSelected = (plan: MealPlan) => {
        return value.some((p) => p.id === plan.id)
    }

    return (
        <div className="flex flex-col gap-2">
            {plans.map((plan) => (
                <button
                    key={plan.id}
                    onClick={() => handleSelect(plan)}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        isSelected(plan)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-grey-200 hover:border-primary-500'
                    }`}
                >
                    <div className="flex flex-col items-start">
                        <span className="text-lg font-medium text-grey-primary">
                            {plan.title}
                        </span>
                        <span className="text-sm text-grey-secondary">
                            {plan.description}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-medium text-grey-primary">
                            +R$ {plan.pricePerDay.toFixed(2)}
                        </span>
                        <span className="text-sm text-grey-secondary">
                            por diária
                        </span>
                        {isSelected(plan) && (
                            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </div>
    )
}
