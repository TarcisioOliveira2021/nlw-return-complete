import { useState } from "react";

import bugImage from "../../assets/bug.svg";
import ideaImage from "../../assets/idea.svg";
import otherImage from "../../assets/other.svg";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImage,
            alt: 'Imagem de um inseto'
        },
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImage,
            alt: 'Imagem de uma lâmpada'
        },
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: otherImage,
            alt: 'Imagem de uma nuvem de pensamento'
        },
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSend, setFeedbackSend] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSend(false);
        setFeedbackType(null);
    }
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSend ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSend(true)}
                        />
                    )}
                </>
            )}


            <footer className="text-xs text-neutral-400">
                Feito com amor pela <a href="https://rocketseat.com.br" className="underline underline-offset-2">Rocketseat</a>
            </footer>
        </div>
    )
}