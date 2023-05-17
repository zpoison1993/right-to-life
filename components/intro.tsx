import {CMS_NAME} from '../lib/constants'
import Link from "next/link";
import StaticItem from "../interfaces/staticItem";

type Props = {
    allStatics: StaticItem[]
}
const Intro = ({allStatics}: Props) => {
    console.log('allSta', allStatics)
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                Право на жизнь
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
                Узнайте подробнее о{' '}
                <Link
                    as={`/statics/mission`}
                    href="/statics/[statics]"
                    className="underline hover:text-blue-600 duration-200 transition-colors"
                >
                    миссии
                </Link>{' '}
                социального фонда.
            </h4>
        </section>
    )
}

export default Intro
