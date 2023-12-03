import toast from 'react-hot-toast';

export function toastSuccess(message) {
    toast.success(message, {
      position: 'top-center',
      style: {
          background: '#61d345',
          color: '#fff',
      },
      iconTheme: {
          primary: '#fff',
          secondary: '#61d345',
      },
    })
}
  
export function toastError(message) {
    toast.error(message, {
      position: 'top-center',
      style: {
        background: '#ff4b4b',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ff4b4b',
      },
    })
}

export async function calculate(percentage, total_number) {
    const apidata = await fetch(`https://api.wolframalpha.com/v1/query?input=${percentage}%25%20of%20${total_number}&appid=${process.env.REACT_APP_WOLFRAM_ID}&format=plaintext&output=json`)
    const data = await apidata.json()
    console.log(data)
    //     primary_dict = next(item for item in result['queryresult']['pods'] if item.get('primary') == True)
    //     return primary_dict['subpods'][0]['plaintext']
    // convert above into javascript
    const pods = data['queryresult']['pods'];
    const primaryDict = pods.find(item => item['primary'] === true);
    const resultText = primaryDict['subpods'][0]['plaintext'];

    return resultText;
}