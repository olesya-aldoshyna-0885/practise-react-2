import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component { 
    state = {
        query: '',
        page: 1,
        photos: [],
        total_results: 0,
        isEmpty: false,
        error: false,

    };
    componentDidUpdate = (prevProps, prevState) => {
        const {query, page} = this.state;
        if (prevState.query !== query || prevState.page !== page) { 
            this.getPhotos(query, page);
    }
    }

    getPhotos = async (query, page) => {
        if (!query) {
            return ;
        }
        try {
            const { photos, total_results } = await ImageService.getImages(
                query,
                page);
            if (photos.length === 0) {
                this.setState({isEmpty: true})
            }
            this.setState(prevState => ({
                photos: [...prevState.photos, ...photos],
                total_results,
            }));
        } catch (error) {
            this.setState({error: true})
        }
    }
    
    handleOnSubmit = value => {
        this.setState({
            query: value, page: 1,
            photos: [],
            total_results: 0,
            isEmpty: false,
        });
    }

    handleOnLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }))
    }

    render() { 
        const { photos, total_results, isEmpty, error } = this.state;
        return (
            <>
            <SearchForm onSubmit={this.handleOnSubmit} />
            <Grid>
                {photos.map(({id,avg_color,alt,src})=> (
                    <GridItem key = { id }>
                        <CardItem color={avg_color}>
                            <img src={src.large} alt={alt} />
                        </CardItem>
                    </GridItem> 
                )) } 
            </Grid>
                {photos.length > 0 && total_results > photos.length && (
                    <Button onClick={this.handleOnLoadMore}>Load more</Button >
                )}
                {isEmpty && (<Text textAlign="center">Sorry. There are no images ... 😭</Text>)}
                {error && (<Text textAlign="center">Sorry. Something wrong ... 😭</Text>)}
            </>
        )
    }
}