import { SimpleFilterItemProps } from './types'

export function SimpleFilterItem(props: SimpleFilterItemProps) {
    return (
        <>
            <label
                className={`SimpleFilterItem ${props.className} `}
                htmlFor={props.labelFor}
            >
                <input
                    className="hidden"
                    type={props.type}
                    name={props.name}
                    id={props.labelFor}
                    value={props.labelFor}
                    defaultChecked={props.defaultChecked}
                    onChange={props.onChange}
                />

                {props.children}
            </label>
        </>
    )
}
