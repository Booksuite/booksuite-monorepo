import { Input } from "@chakra-ui/react";
import { useState } from "react";

const DateInput = ({ onChange }: { onChange: (isoDate: string) => void }) => {
    const [date, setDate] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const isoDate = new Date(selectedDate).toISOString(); // Converte para ISO 8601
        setDate(selectedDate);
        onChange(isoDate);
    };

    return (
        <Input
            type="datetime-local"
            value={date}
            onChange={handleChange}
        />
    );
};

export default DateInput;
