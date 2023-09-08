const formatDate = (newDate: string) => {
  const date = new Date(newDate);
  const formattedDate = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
  return formattedDate;
};

export default formatDate;
