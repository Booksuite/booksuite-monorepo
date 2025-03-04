import { Gallery } from '@/components/organisms/Gallery'

export default function Pageeee() {
    return (
        <div>
            <h1>Page</h1>
            <Gallery.Root
                items={[
                    'https://static.wixstatic.com/media/30ceac_834e2efc92654460b23f7666eff85dec~mv2.jpg/v1/fit/w_853,h_640,q_90,enc_avif,quality_auto/30ceac_834e2efc92654460b23f7666eff85dec~mv2.jpg',
                ]}
            />
        </div>
    )
}
