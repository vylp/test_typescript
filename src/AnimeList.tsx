import React, {Component, useEffect, useState} from 'react';
import {AnimeModel} from "./models/anime.model";
import {getAnimeList} from "./services/anime-list.service";
import './anime-list.scss';
import {Button, Modal, Table, Pagination} from "react-bootstrap";

const AnimeList = () => {
    const [animes, setAnimes] = useState<AnimeModel[]>([]);
    const [maxPage, setMaxPage] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState<string>('Ghibi');
    const [currentItem, setCurrentItem]= useState<AnimeModel| null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [sort, setSort] = useState(null);
    useEffect(() => {fetchAnime() }, []);
    const fetchAnime = (): void => {
        getAnimeList({q, page}).then(({results, last_page}) => {
            setAnimes(results);
            setMaxPage(last_page);
        })
    }

    const handleText = (e: React.FormEvent<HTMLInputElement>) => {
        setQ(e.currentTarget.value)
    }
    const handleClick = (item: AnimeModel) => {
        setCurrentItem(item);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentItem(null);
    }
    const renderPagination = () => {
        let items = [];
        for (let i =1 ; i <= maxPage; i++ ) {
            items.push(
                <Pagination.Item key={i}>
                    {i}
                </Pagination.Item>,
            );
        }
    }
    return (

        <div className={'anime-view'}>
            <div className={'search'}>
                <input onChange={handleText}/>
                <Button onClick={fetchAnime} variant="secondary">Search</Button>
            </div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Episodes</th>
                    </tr>

                </thead>
                <tbody>
                {
                    animes.map((anime: AnimeModel) =>  (
                        <tr className={'table-row'} onClick={() => handleClick(anime)} key={anime.mal_id}>
                            <th>{anime.title}</th>
                            <th>{anime.synopsis}</th>
                            <th>{anime.type}</th>
                            <th>{anime.episodes}</th>
                        </tr>))
                }
                </tbody>
            </Table>
            g
            <Modal
                show={showModal}
                dialogClassName="modal-90w"
                centered={true}
                size={'lg'}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{currentItem?.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img src={currentItem?.image_url} />
                    <div>
                        <span>Description</span>
                        <p></p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export  default AnimeList;
