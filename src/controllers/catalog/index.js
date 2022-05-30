const index = async (req, res) =>
{
    try
    {
        //
    }
    catch(error)
    {
        console.log(error)
        res.status(422).json(error)
    }
}

const store = async (req, res) =>
{
    //
}

const show = async (req, res) =>
{
    // 
}

const update = async (req, res) =>
{
    // 
}

const destroy = async (req, res) =>
{
    // 
}

module.exports =
{
    index,
    store,
    show,
    update,
    destroy
}