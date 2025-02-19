import Link from 'next/link'

import InputBox from '@/components/atoms/Input/InputBox'

export default function EsqueciMinhaSenha() {
    return (
        <div className="EsqueciMinhaSenha">
            <p className="mb-10">
                Digite seu e-mail que enviaremos um link <br /> para a
                recuperação de sua senha.
            </p>

            <form action="">
                <InputBox className="w-full" label="E-mail" type="email" />

                <button className="btn btn-secondary w-full" type="submit">
                    Enviar
                </button>
            </form>

            <Link className="text-center forgot-pass" href={'/login'}>
                Voltar
            </Link>
        </div>
    )
}
