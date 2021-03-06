import { useEffect, useState } from 'react';


const useFetch = (sub, setFeed, subFeeds, after,  setCallFail, setError, setLoading) => {
    const [isPending, setIsPending] = useState(false);


    useEffect(() => {
        if (isPending === false) {
            setIsPending(true);

            fetch(`https://www.reddit.com/r/${sub}/hot.json?t=day&limit=15&after=${after}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Oops something went wrong ${res.status} please reload ( ͡❛ ﹏ ͡❛)`)
                    } else {
                        return res.json()
                    }

                })
                .then(body => {
                    setFeed([]);
                    setCallFail(false);
                    setLoading(false);
                    setFeed(body.data.children);
                    switch (sub) {
                        case 'twitter_memes':
                            subFeeds.twitter.arr.current = body.data.children;
                            subFeeds.twitter.after.current = body.data.after;
                            break;
                        case 'goodanimemes':
                            subFeeds.anime.arr.current = body.data.children;
                            subFeeds.anime.after.current = body.data.after;
                            break;
                        case 'memes':
                            subFeeds.memes.arr.current = body.data.children;
                            subFeeds.memes.after.current = body.data.after;
                            break;
                        case 'meIRL':
                            subFeeds.meirl.arr.current = body.data.children;
                            subFeeds.meirl.after.current = body.data.after;
                            break;

                        default:
                            break;
                    }


                }).then(() => {
                    setIsPending(false);
                })
                .catch(error => {
                    setIsPending(false);
                    setLoading(false);
                    if (error.message === 'Failed to fetch') {
                        setCallFail(true)
                        setError(`Please check your internet connection and reload ( ͡❛ ﹏ ͡❛)`);
                    } else {
                        setCallFail(true)
                        setError(error.message);
                    }

                })
        }else {
            //do nothing
        }


    }, [sub, after]);


}

export default useFetch;