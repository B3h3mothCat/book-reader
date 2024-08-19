import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function List() {
    const { chapters, title } = useLocation().state;

    return (
        <>
            <h1>{title}</h1>
            <h3>Chapters:</h3>
            <ul>
                {chapters.map((chapter, index) => (
                    <li key={index}>
                        <Link
                            to={`/chapter/${encodeURIComponent(chapter.content)}`}
                            state={{
                                currentChapterIndex: index,
                                chapters: chapters,

                                title: title,

                            }}
                        >{chapter.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

// можно передать вторым параметром лист => получатель меняет индекс файла в листе и получает главу?
