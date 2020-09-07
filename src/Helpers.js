export const notification = (setter) => {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
};

export const getStatus = (sw, cl, wl) => {
  let status = 'win';

  sw.split('').forEach((letter) => {
    if (!cl.includes(letter)) {
      status = '';
    }
  });

  if (wl.length === 6) status = 'lose';

  return status;
};
